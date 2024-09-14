import express, {Express} from 'express'

import { prisma } from '../../lib/prismaClient'

export function bookRoute(app: Express): void {
    const router = express.Router()
    
    
    app.use('/api/book', router)

    router.get('/', async (req, res) => {
      try {
        const products = await prisma.product.findMany();
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
    });
    router.post('/', async (req, res) => {
        const {name,author,image,price,variation,collection} = req.body;
        try {
          const newBook = await prisma.product.create({
            data: {
              name,
              author,
              image,
              price,
              variation: { connect: { id: 1 } },
              collection: { connect: { id: 1 } }
            },
          });
          res.status(201).json(newBook);
        } catch (error) {
          res.status(500).json({ error: 'Failed to create product' });
        }
      });
      router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const {name,author,image,price } = req.body;
        try {
          const updatedBook = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                author,
                image,
                price
            },
          });
          res.json(updatedBook);
        } catch (error) {
          res.status(500).json({ error: 'Failed to update product' });
        }
      });
      router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
          await prisma.product.delete({
            where: { id: parseInt(id) },
          });
          res.json({ message: 'Product deleted' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete product' });
        }
      });
}

