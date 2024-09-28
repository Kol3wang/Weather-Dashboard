import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (req: Request, res: Response) => {
    // Assuming index.html is in a directory named "public" in the project root
    const indexPath = path.join(__dirname, '../public/index.html');
    
    // Serve the index.html file
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(500).send('Error serving index.html');
      }
    });
  });
export default router;
