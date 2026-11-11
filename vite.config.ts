import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function mediaUploadPlugin(): Plugin {
  return {
    name: 'media-upload-handler',
    configureServer(server) {
      // 1. Drone video upload (Permanent storage on server disk)
      server.middlewares.use('/api/upload-drone-video', (req, res) => {
        const publicPath = path.resolve(process.cwd(), 'public/eagle-view-farm.mp4');
        const distPath = path.resolve(process.cwd(), 'dist/eagle-view-farm.mp4');

        const syncToDistAndManifest = () => {
          try {
            if (fs.existsSync(path.dirname(distPath))) {
              fs.copyFileSync(publicPath, distPath);
            }
          } catch {
            // ignore
          }
          try {
            updateManifest(['eagle-view-farm.mp4']);
          } catch {
            // ignore
          }
        };

        if (req.method === 'GET') {
          if (fs.existsSync(publicPath)) {
            const stats = fs.statSync(publicPath);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              exists: true,
              isPermanent: true,
              url: '/eagle-view-farm.mp4',
              size: stats.size,
              sizeFormatted: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
              updatedAt: stats.mtime.toISOString(),
              storageLocation: 'Permanent Server Disk (public/eagle-view-farm.mp4)'
            }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ exists: false, url: '/eagle-view-farm.mp4' }));
          }
          return;
        }

        if (req.method === 'POST') {
          const contentType = req.headers['content-type'] || '';

          // Support JSON base64 uploads
          if (contentType.includes('application/json')) {
            const chunks: Buffer[] = [];
            req.on('data', (c) => chunks.push(c));
            req.on('end', () => {
              try {
                const bodyStr = Buffer.concat(chunks).toString('utf-8');
                const data = JSON.parse(bodyStr);
                if (data.dataUrl && data.dataUrl.includes('base64,')) {
                  const b64Data = data.dataUrl.split('base64,')[1];
                  const buffer = Buffer.from(b64Data, 'base64');
                  fs.writeFileSync(publicPath, buffer);
                  syncToDistAndManifest();
                  const stats = fs.statSync(publicPath);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    success: true,
                    url: '/eagle-view-farm.mp4',
                    size: stats.size,
                    updatedAt: stats.mtime.toISOString(),
                    isPermanent: true,
                    storageLocation: 'Permanent Server Disk (public/eagle-view-farm.mp4)'
                  }));
                  return;
                }
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing base64 dataUrl in JSON body' }));
              } catch (e: any) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: e?.message || 'Invalid JSON' }));
              }
            });
            return;
          }

          // Direct binary stream
          const fileStream = fs.createWriteStream(publicPath);
          req.pipe(fileStream);

          fileStream.on('finish', () => {
            syncToDistAndManifest();
            const stats = fs.statSync(publicPath);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              url: '/eagle-view-farm.mp4',
              size: stats.size,
              updatedAt: stats.mtime.toISOString(),
              isPermanent: true,
              storageLocation: 'Permanent Server Disk (public/eagle-view-farm.mp4)'
            }));
          });

          fileStream.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          });
          return;
        }

        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });

      // 1b. Save video directly to public folder endpoint
      server.middlewares.use('/api/save-video-to-public', (req, res) => {
        const publicPath = path.resolve(process.cwd(), 'public/eagle-view-farm.mp4');
        const distPath = path.resolve(process.cwd(), 'dist/eagle-view-farm.mp4');

        const syncAndRespond = (extraMsg?: string) => {
          try {
            if (fs.existsSync(publicPath) && fs.existsSync(path.dirname(distPath))) {
              fs.copyFileSync(publicPath, distPath);
            }
          } catch {
            // ignore
          }
          try {
            updateManifest(['eagle-view-farm.mp4']);
          } catch {
            // ignore
          }
          const stats = fs.existsSync(publicPath) ? fs.statSync(publicPath) : null;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: extraMsg || 'Video is permanently saved in public/eagle-view-farm.mp4',
            url: '/eagle-view-farm.mp4',
            size: stats ? stats.size : 0,
            sizeFormatted: stats ? (stats.size / (1024 * 1024)).toFixed(2) + ' MB' : '0 MB',
            updatedAt: stats ? stats.mtime.toISOString() : new Date().toISOString(),
            isPermanent: true,
            storageLocation: 'Permanent Server Disk (public/eagle-view-farm.mp4)'
          }));
        };

        if (req.method === 'GET') {
          syncAndRespond();
          return;
        }

        if (req.method === 'POST') {
          const contentType = req.headers['content-type'] || '';
          if (contentType.includes('application/json')) {
            const chunks: Buffer[] = [];
            req.on('data', (c) => chunks.push(c));
            req.on('end', () => {
              try {
                const bodyStr = Buffer.concat(chunks).toString('utf-8');
                if (bodyStr.trim()) {
                  const data = JSON.parse(bodyStr);
                  if (data.dataUrl && data.dataUrl.includes('base64,')) {
                    const b64Data = data.dataUrl.split('base64,')[1];
                    const buffer = Buffer.from(b64Data, 'base64');
                    fs.writeFileSync(publicPath, buffer);
                  }
                }
                syncAndRespond('Video successfully saved to public/eagle-view-farm.mp4');
              } catch (e: any) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: e?.message || 'Invalid JSON' }));
              }
            });
            return;
          }

          // Binary stream
          const fileStream = fs.createWriteStream(publicPath);
          req.pipe(fileStream);
          fileStream.on('finish', () => {
            syncAndRespond('Video successfully saved to public/eagle-view-farm.mp4');
          });
          fileStream.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          });
          return;
        }

        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });

      // Global metadata mapping for all permanent assets
      const metadataMap: Record<string, { slotKey: string; title: string; category: string; description: string }> = {
        "logo.jpg": { slotKey: "logo", title: "Official Genius Dairy Farms Limited Emblem Logo", category: "Brand & Identity", description: "The registered circular emblem of Genius Dairy Farms Limited." },
        "genius-dairy-logo.jpg": { slotKey: "logo", title: "Genius Dairy Farms Official Logo (High Res)", category: "Brand & Identity", description: "High-resolution circular brand crest." },
        "academy-logo.jpg": { slotKey: "academyLogo", title: "Genius Dairy Academy Limited Official Logo", category: "Brand & Identity", description: "Official crest featuring dairy herd, milk vessel, and motto Learn • Grow • Lead." },
        "genius-academy-logo.jpg": { slotKey: "academyLogo", title: "Genius Dairy Academy Limited Emblem (High Res)", category: "Brand & Identity", description: "Accredited educational division official emblem." },
        "cac-certificate.jpg": { slotKey: "cacCertificate", title: "CAC Certificate of Incorporation (RC: 8888771)", category: "Brand & Identity", description: "Official business verification certificate issued by the Corporate Affairs Commission." },
        "founder.jpg": { slotKey: "founder", title: "Founder & Managing Director (Moyosore Olatunde Rafiu)", category: "Brand & Identity", description: "Founder and Managing Director Moyosore Olatunde Rafiu on-site at the Iseyin dairy ranch." },
        "founder-md.jpg": { slotKey: "founder", title: "Founder & Managing Director Moyosore Olatunde Rafiu", category: "Brand & Identity", description: "Authentic photograph of Founder & Managing Director Moyosore Olatunde Rafiu at the dairy farm complex." },
        "founder-portrait.jpg": { slotKey: "founder", title: "Founder Executive Portrait", category: "Brand & Identity", description: "Leadership profile portrait for Moyosore Olatunde Rafiu." },
        "moyosore-rafiu.jpg": { slotKey: "founder", title: "Moyosore Olatunde Rafiu Master Photo", category: "Brand & Identity", description: "High-resolution master portrait at the farm." },
        "moyosore-olatunde-rafiu.jpg": { slotKey: "founder", title: "Moyosore Olatunde Rafiu Farm Portrait", category: "Brand & Identity", description: "Executive leadership profile photo." },
        "FB_IMG_1789307249332.jpg": { slotKey: "founder", title: "Leadership Archive Photo", category: "Brand & Identity", description: "Archived executive capture at the farm complex." },
        "hero.jpg": { slotKey: "hero", title: "Home Hero Pasture & Ranch View", category: "Home & Facilities", description: "Primary cinematic welcome view showcasing the dairy facilities and pastures." },
        "corporateFarmFacility.jpg": { slotKey: "corporateFarmFacility", title: "60-Acre Farm Facility & Headquarters", category: "Home & Facilities", description: "Commercial dairy ranch complex along Iseyin–Ibadan Expressway, Oyo State." },
        "farmPanorama.jpg": { slotKey: "farmPanorama", title: "Vast Farmland Landscape Panorama", category: "Home & Facilities", description: "Wide panoramic view of grazing savanna and cattle in sunlight." },
        "eagle-view-farm.jpg": { slotKey: "eagleViewFarm", title: "Eagle Aerial Drone View of 60-Acre Ranch", category: "Home & Facilities", description: "High-altitude drone aerial perspective capturing paddocks, barns, and boundaries." },
        "dairy-barn-aerial.jpg": { slotKey: "dairyBarnAerial", title: "Dairy Barn & Corral Paddocks Aerial", category: "Home & Facilities", description: "High-angle drone capture of sheltered housing, feed bunks, and paddocks." },
        "farm-aerial-tour.jpg": { slotKey: "farmPanorama", title: "Farm Aerial Inspection Tour", category: "Home & Facilities", description: "Aerial overview of the entire 60-acre integrated dairy facility." },
        "1200x794.jpg": { slotKey: "crossbreedCattle", title: "High-Yield Dairy Crossbreed Cattle", category: "Livestock & Operations", description: "F1 crossbreed dairy cow selected for tropical heat tolerance and high milk production." },
        "grazingHerd.jpg": { slotKey: "grazingHerd", title: "Pastoral Livestock Grazing Herd", category: "Livestock & Operations", description: "Rotational pasture grazing herd in lush savanna." },
        "cattleCare.jpg": { slotKey: "cattleCare", title: "Cattle Care & Veterinary Monitoring", category: "Livestock & Operations", description: "Veterinary inspection, vaccination, and intensive herd health monitoring." },
        "hygienicFacility.jpg": { slotKey: "hygienicFacility", title: "Hygienic Milking & Dairy Processing Facility", category: "Livestock & Operations", description: "Sanitary processing environment and stainless-steel cold chain equipment." },
        "lushPasture.jpg": { slotKey: "lushPasture", title: "Lush Savanna Pasture & Forage Agronomy", category: "Pasture & Agronomy", description: "Cultivated high-tonnage Guinea grass and Brachiaria pastures." },
        "pastureManagement.jpg": { slotKey: "pastureManagement", title: "Intensive Pasture Management & Silage", category: "Pasture & Agronomy", description: "Systematic forage conservation and dry season feed management." },
        "trainingField.jpg": { slotKey: "trainingField", title: "Genius Dairy Academy Practical Training Field", category: "Academy & Training", description: "Field instruction in paddock layout, animal handling, and pasture management." },
        "studentGroup.jpg": { slotKey: "studentGroup", title: "Genius Dairy Academy Limited Student Cohort", category: "Academy & Training", description: "Next-generation Nigerian agropreneurs and university students in practical training." },
        "handsOnDemonstration.jpg": { slotKey: "handsOnDemonstration", title: "Hands-on Practical Demonstration & AI", category: "Academy & Training", description: "Artificial insemination, ultrasound pregnancy checks, and clinical practice." },
        "sustainabilityLandscape.jpg": { slotKey: "sustainabilityLandscape", title: "Sustainability & Agro-Ecological Landscape", category: "Sustainability", description: "Integrated crop-livestock circular economy and environmental stewardship." },
        "solarAndCleanWater.jpg": { slotKey: "solarAndCleanWater", title: "Solar Power & Clean Borehole Water", category: "Sustainability", description: "Off-grid renewable solar arrays powering boreholes, coolers, and ranch facilities." },
        "insight-yield-transformation.jpg": { slotKey: "insightYield", title: "Insight: Dairy Yield Transformation (1.5L to 15L Daily)", category: "Insights & News", description: "Lesson on genetic crossbreeding and nutrition strategies at Iseyin ranch." },
        "insight-silage-pasture.jpg": { slotKey: "insightSilage", title: "Insight: Year-Round Silage & Dry Season Forage Strategies", category: "Insights & News", description: "Intensive paddock rotation and pit silage conservation in Oyo State." },
        "insight-ddp-milestone.jpg": { slotKey: "insightMilestone", title: "Insight: Dairy Development Programme (FrieslandCampina WAMCO)", category: "Insights & News", description: "Historic 2014 benchmark and commercial scaling milestone." },
        "insight-youth-education.jpg": { slotKey: "insightEducation", title: "Insight: Empowering Youth Dairy Professionals", category: "Insights & News", description: "Practical hands-on training for next-generation dairy leaders." },
        "insight-dairy-policy.jpg": { slotKey: "insightPolicy", title: "Insight: Nigeria National Dairy Policy & Backward Integration", category: "Insights & News", description: "Domestic raw milk sourcing and commercial ranching standards." },
        "eagle-view-farm.mp4": { slotKey: "eagleViewVideo", title: "60-Acre Drone Aerial Video Flight", category: "Home & Facilities", description: "Full drone flyover tour of the entire farm complex in Iseyin." },
        "udderfallYogurtHero.jpg": { slotKey: "udderfallYogurtHero", title: "Udderfall Fresh Stirred Whole Milk Yogurt", category: "Our Dairy Products", description: "Thick, creamy artisan whole milk yogurt cultured with active probiotics." },
        "greekYogurtBowl.jpg": { slotKey: "greekYogurtBowl", title: "Udderfall Triple-Strained Greek Yogurt", category: "Our Dairy Products", description: "Velvety, high-protein strained Greek yogurt rich in natural butterfat." },
        "freshWaraCheese.jpg": { slotKey: "freshWaraCheese", title: "Udderfall Artisan Fresh Traditional Wara Cheese", category: "Our Dairy Products", description: "Traditional Nigerian fresh soft curds handcrafted from whole milk." },
        "udderfallCheeseHero.jpg": { slotKey: "udderfallCheeseHero", title: "Udderfall Farmstead Aged Semi-Hard Cheese", category: "Our Dairy Products", description: "Handcrafted artisan cheese wheels aged in curing chambers." },
        "commercialMozzarella.jpg": { slotKey: "commercialMozzarella", title: "Commercial Pizza Mozzarella Melt & Stretch", category: "Our Dairy Products", description: "High-stretch low-moisture mozzarella formulated for pizzeria ovens." },
        "mozzarellaBlock.jpg": { slotKey: "mozzarellaBlock", title: "Vacuum-Sealed Mozzarella Blocks & Shreds", category: "Our Dairy Products", description: "2kg vacuum-sealed mozzarella blocks and pre-shredded packs." },
        "strawberryYogurt.jpg": { slotKey: "strawberryYogurt", title: "Udderfall Real Strawberry Stirred Yogurt", category: "Our Dairy Products", description: "Refreshing fruit-blended yogurt with natural strawberry coulis." },
        "vanillaYogurt.jpg": { slotKey: "vanillaYogurt", title: "Udderfall Bourbon Vanilla Creamy Yogurt", category: "Our Dairy Products", description: "Silky stirred yogurt infused with natural aromatic vanilla extract." },
        "freshMilkPour.jpg": { slotKey: "freshMilkPour", title: "Pure Farmstead Whole Milk Harvest & Processing", category: "Our Dairy Products", description: "Grade-A farm-fresh whole cow milk chilled immediately to 4°C." },
        "foodServiceKitchen.jpg": { slotKey: "foodServiceKitchen", title: "Commercial Culinary & Foodservice Applications", category: "Our Dairy Products", description: "Executive chefs and commercial kitchens using Udderfall cheese, butter, and yogurt." }
      };

      // Helper function to update uploads-manifest.json
      const updateManifest = (newFiles: string[] = []) => {
        try {
          const publicDir = path.resolve(process.cwd(), 'public');
          const files = fs.readdirSync(publicDir);

          const imageList: any[] = [];
          for (const file of files) {
            if (!/\.(jpe?g|png|webp|mp4)$/i.test(file)) continue;
            const filePath = path.join(publicDir, file);
            const stats = fs.statSync(filePath);
            const meta = metadataMap[file] || {
              slotKey: file.replace(/\.[^.]+$/, ""),
              title: file.replace(/[-_]/g, " ").replace(/\.[^.]+$/, ""),
              category: "General Media",
              description: "Uploaded farm media asset."
            };

            imageList.push({
              id: file.replace(/\.[^.]+$/, ""),
              filename: file,
              url: "/" + file,
              size: stats.size,
              sizeFormatted: (stats.size / 1024).toFixed(1) + " KB",
              updatedAt: stats.mtime.toISOString(),
              isPermanent: true,
              storageLocation: "Permanent Server Disk (public/" + file + ")",
              ...meta
            });
          }

          const manifest = {
            version: "1.0",
            lastVerified: new Date().toISOString(),
            totalAssets: imageList.length,
            totalSizeBytes: imageList.reduce((acc, x) => acc + x.size, 0),
            images: imageList
          };

          fs.writeFileSync(path.resolve(process.cwd(), 'public/uploads-manifest.json'), JSON.stringify(manifest, null, 2));
          try {
            const distPath = path.resolve(process.cwd(), 'dist/uploads-manifest.json');
            if (fs.existsSync(path.dirname(distPath))) {
              fs.writeFileSync(distPath, JSON.stringify(manifest, null, 2));
            }
          } catch {
            // ignore
          }
          return manifest;
        } catch (e) {
          console.error("Failed to update manifest:", e);
          return null;
        }
      };

      // 2. GET /api/uploaded-images - return list of all permanently saved user images
      server.middlewares.use('/api/uploaded-images', (req, res) => {
        if (req.method === 'GET') {
          const manifest = updateManifest();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(manifest || { totalAssets: 0, images: [] }));
          return;
        }
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });

      // 3. GET /api/insight-images - return all permanent insight article images
      server.middlewares.use('/api/insight-images', (req, res) => {
        if (req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            'yield-transformation-nigeria': '/insight-yield-transformation.jpg',
            'silage-pasture-dry-season': '/insight-silage-pasture.jpg',
            'ddp-frieslandcampina-turning-point': '/insight-ddp-milestone.jpg',
            'academy-empowering-youth': '/insight-youth-education.jpg',
            'nigeria-dairy-policy': '/insight-dairy-policy.jpg',
          }));
          return;
        }
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });

      // 4. POST /api/save-all-insight-images - bulk persist insight images to disk
      server.middlewares.use('/api/save-all-insight-images', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { images } = JSON.parse(body);
              if (!images || typeof images !== 'object') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'images map is required' }));
                return;
              }

              const saved: string[] = [];
              const publicDir = path.resolve(process.cwd(), 'public');
              const distDir = path.resolve(process.cwd(), 'dist');

              const fileMap: Record<string, string[]> = {
                'yield-transformation-nigeria': ['insight-yield-transformation.jpg', '1200x794.jpg'],
                'silage-pasture-dry-season': ['insight-silage-pasture.jpg', 'dairy-barn-aerial.jpg'],
                'ddp-frieslandcampina-turning-point': ['insight-ddp-milestone.jpg', 'corporateFarmFacility.jpg'],
                'academy-empowering-youth': ['insight-youth-education.jpg', 'trainingField.jpg', 'studentGroup.jpg'],
                'nigeria-dairy-policy': ['insight-dairy-policy.jpg', 'pastureManagement.jpg'],
              };

              for (const [artId, dataUrl] of Object.entries(images)) {
                if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) continue;
                const matches = dataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                if (!matches) continue;
                const buffer = Buffer.from(matches[2], 'base64');
                const targets = fileMap[artId] || [`insight-${artId}.jpg`];

                for (const filename of targets) {
                  fs.writeFileSync(path.join(publicDir, filename), buffer);
                  try {
                    if (fs.existsSync(distDir)) {
                      fs.writeFileSync(path.join(distDir, filename), buffer);
                    }
                  } catch {
                    // non-critical
                  }
                  saved.push(filename);
                }
              }

              updateManifest(saved);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, savedFiles: saved, isPermanent: true }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });

      // 5. Brand media & image upload (Logo, Insights, Founder, Farm photos)
      server.middlewares.use('/api/upload-media', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const {
                slotKey,
                dataUrl,
                filename: reqFilename,
                title: reqTitle,
                category: reqCategory,
                description: reqDescription
              } = JSON.parse(body);

              if (!dataUrl) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'dataUrl is required' }));
                return;
              }

              const matches = dataUrl.match(/^data:([A-Za-z0-9-+./]+);base64,(.+)$/);
              if (!matches) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid base64 data URL' }));
                return;
              }
              const mimeType = matches[1];
              const buffer = Buffer.from(matches[2], 'base64');
              const isVideo = mimeType.startsWith('video/') || (reqFilename && /\.(mp4|webm|mov)$/i.test(reqFilename));

              let targetFiles: string[] = [];
              const key = String(slotKey || '').toLowerCase();

              // If an explicit target filename is provided
              if (reqFilename && typeof reqFilename === 'string' && reqFilename.trim().length > 0) {
                const cleanName = path.basename(reqFilename).replace(/[^a-zA-Z0-9._-]/g, '_');
                targetFiles.push(cleanName);
              } else if (key === 'logo' || (key.includes('logo') && !key.includes('academy'))) {
                targetFiles.push('logo.jpg', 'genius-dairy-logo.jpg');
              } else if (key === 'academylogo' || key.includes('academy-logo') || key.includes('genius-academy-logo')) {
                targetFiles.push('academy-logo.jpg', 'genius-academy-logo.jpg');
              } else if (key === 'insightyield' || key === 'yield-transformation-nigeria') {
                targetFiles.push('insight-yield-transformation.jpg', '1200x794.jpg');
              } else if (key === 'insightsilage' || key === 'silage-pasture-dry-season') {
                targetFiles.push('insight-silage-pasture.jpg', 'dairy-barn-aerial.jpg');
              } else if (key === 'insightmilestone' || key === 'ddp-frieslandcampina-turning-point') {
                targetFiles.push('insight-ddp-milestone.jpg', 'corporateFarmFacility.jpg');
              } else if (key === 'insighteducation' || key === 'academy-empowering-youth') {
                targetFiles.push('insight-youth-education.jpg', 'trainingField.jpg', 'studentGroup.jpg');
              } else if (key === 'insightpolicy' || key === 'nigeria-dairy-policy') {
                targetFiles.push('insight-dairy-policy.jpg', 'pastureManagement.jpg');
              } else if (key === 'crossbreedcattle' || key === 'defaultinsightfallback') {
                targetFiles.push('1200x794.jpg');
              } else if (key === 'founder' || key.includes('founder')) {
                targetFiles.push('founder.jpg', 'founder-portrait.jpg');
              } else if (key === 'caccertificate') {
                targetFiles.push('cac-certificate.jpg');
              } else if (key === 'dairybarnaerial') {
                targetFiles.push('dairy-barn-aerial.jpg');
              } else if (key === 'eagleviewfarm') {
                targetFiles.push('eagle-view-farm.jpg');
              } else if (key === 'eagleviewvideo' || key.includes('video') || key.includes('drone')) {
                targetFiles.push('eagle-view-farm.mp4');
              } else {
                const ext = isVideo ? 'mp4' : 'jpg';
                targetFiles.push(`${slotKey}.${ext}`);
              }

              for (const filename of targetFiles) {
                const pubPath = path.resolve(process.cwd(), 'public', filename);
                fs.writeFileSync(pubPath, buffer);
                const distPath = path.resolve(process.cwd(), 'dist', filename);
                try {
                  if (fs.existsSync(path.dirname(distPath))) {
                    fs.writeFileSync(distPath, buffer);
                  }
                } catch {
                  // ignore
                }

                // If custom metadata was provided, register it in metadataMap
                if (reqTitle || reqCategory || reqDescription) {
                  metadataMap[filename] = {
                    slotKey: slotKey || filename.replace(/\.[^.]+$/, ''),
                    title: reqTitle || filename.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''),
                    category: reqCategory || (isVideo ? 'Drone & Aerial Video' : 'General Media'),
                    description: reqDescription || (isVideo ? 'Public server video asset.' : 'Public server image asset.')
                  };
                }
              }

              const manifest = updateManifest(targetFiles);
              const primaryFile = targetFiles[0];
              const primaryPath = path.resolve(process.cwd(), 'public', primaryFile);
              const primaryStats = fs.existsSync(primaryPath) ? fs.statSync(primaryPath) : null;

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                message: `Successfully saved to public server: public/${primaryFile}`,
                url: `/${primaryFile}`,
                filename: primaryFile,
                savedFiles: targetFiles,
                storageLocation: `Permanent Server Disk (public/${primaryFile})`,
                size: primaryStats ? primaryStats.size : buffer.length,
                sizeFormatted: primaryStats ? (primaryStats.size > 1048576 ? (primaryStats.size / 1048576).toFixed(2) + ' MB' : (primaryStats.size / 1024).toFixed(1) + ' KB') : '0 KB',
                updatedAt: primaryStats ? primaryStats.mtime.toISOString() : new Date().toISOString(),
                isPermanent: true,
                isVideo: isVideo || primaryFile.endsWith('.mp4')
              }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });

      // 6. Public Server Statistics & Health Endpoint
      server.middlewares.use('/api/public-server-stats', (req, res) => {
        if (req.method === 'GET') {
          try {
            const pubDir = path.resolve(process.cwd(), 'public');
            const allFiles = fs.readdirSync(pubDir);
            const mediaFiles = allFiles.filter(f => /\.(jpe?g|png|webp|mp4|webm|svg)$/i.test(f));
            let totalBytes = 0;
            let imagesCount = 0;
            let videosCount = 0;

            const filesList = mediaFiles.map(file => {
              const fullP = path.join(pubDir, file);
              const st = fs.statSync(fullP);
              totalBytes += st.size;
              const isVid = /\.(mp4|webm)$/i.test(file);
              if (isVid) videosCount++;
              else imagesCount++;

              return {
                filename: file,
                url: `/${file}`,
                size: st.size,
                sizeFormatted: st.size > 1048576 ? (st.size / 1048576).toFixed(2) + ' MB' : (st.size / 1024).toFixed(1) + ' KB',
                updatedAt: st.mtime.toISOString(),
                isVideo: isVid,
                storageLocation: `Permanent Server Disk (public/${file})`
              };
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              publicDirectory: pubDir,
              totalMediaFiles: mediaFiles.length,
              imagesCount,
              videosCount,
              totalSizeBytes: totalBytes,
              totalSizeFormatted: (totalBytes / (1024 * 1024)).toFixed(2) + ' MB',
              serverTime: new Date().toISOString(),
              status: 'HEALTHY_PERMANENT_DISK',
              files: filesList
            }));
          } catch (e: any) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e?.message || 'Failed to read server stats' }));
          }
          return;
        }
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mediaUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
