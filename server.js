import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import 'colors';
import routes from '#routes/routes.js';
import { errorHandler } from '#middlewares/errorMiddleware.js';
import itemModel from '#models/itemModel.js';
import { products } from './products.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// export const seedItems = async (req, res) => {
//     try {
   
  
//       const items = await Promise.all(
//         products.map(async (product) => {
//           return await itemModel.create({
//             title: product.name,
//             sellerStore: '686d62f529a3f8edcb01f301',
//             slug: product.name.toLowerCase().replace(/ /g, "-") + '-' + product.id,
//             description: product.description,
//             price: product.price,
//             image: product.image,
//             inStock: product.inStock,
//             isAffiliateItem: true,
//             link: product.affiliateLink,
//           });
//         })
//       );
  
//       res.status(200).json({ message: "Items seeded", items });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to seed items" });
//     }
//   };
  
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api', routes);
// app.get('/seed-items', seedItems);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}.`.green));