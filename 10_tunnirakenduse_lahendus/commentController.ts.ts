import { Request, Response, Router } from "express";
import Comment from "../models/comment";

const router: Router = Router();
// loob uue kommentaari andmeobjekti
router.post('/comment', async (req: Request, res: Response) => {
  const data = new Comment({
      date: new Date(),
      content: req.body.content,
      article: req.body.article
  })
// salvestab kommentaari andmebaasi
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({message: error})
  }
})
// võtab kõik kommentaarid andmebaasist, koos artiklite andmetega
router.get('/comment', async (req: Request, res: Response) => {
  try{
    const data = await Comment.find().populate('article');
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error})
  }
})
// võtab kommentaari andmebaasist selle ID põhjal
router.get('/comment/:id', async (req: Request, res: Response) => {
  try{
    const data = await Comment.findById(req.params.id);
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error})
  }
})
// kustutab kommentaari andmebaasist ID põhjal
router.delete('/comment/:id', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    await Comment.findByIdAndDelete(id)
    const data = await Comment.find();
    res.send(data);
  }
  catch(error){
    res.status(500).json({message: error})
  }
})
// uuendab kommentaari andmebaasis selle ID põhjal
router.put('/comment/:id', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Comment.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
  }
  catch(error){
    res.status(500).json({message: error})
  }
})


export default router;