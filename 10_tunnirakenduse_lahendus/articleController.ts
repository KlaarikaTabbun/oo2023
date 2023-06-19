import { Request, Response, Router } from "express";
import Article from "../models/article";
import Comment from "../models/comment";

const router: Router = Router();
//uus artikkel
router.post('/article', async (req: Request, res: Response) => {
  const data = new Article({
      header: req.body.header,//saab päringu kehast pealkirja
      content: req.body.content//sisu
  })
//salvesta andmebaasi
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({message: error})//veateade
  }
})
//võta koik artikklid
router.get('/article', async (req: Request, res: Response) => {
  try{
    const data = await Article.find();//võta art andmebaasist
    res.json(data)//saada art json vastusena
  }
  catch(error){
    res.status(500).json({message: error})
  }
})
//artikkel id alusel
router.get('/article/:id', async (req: Request, res: Response) => {
  try{
    const data = await Article.findById(req.params.id);
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error})
  }
})
//kustuta art id alusel
router.delete('/article/:id', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    await Article.findByIdAndDelete(id);//id alusel kustuta
    const data = await Article.find();//võta kustutatud art
    res.send(data);
  }
  catch(error){
    res.status(500).json({message: error})
  }
})
//uuenda
router.put('/article/:id', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };  

    const result = await Article.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)//saada tagasi
  }
  catch(error){
    res.status(500).json({message: error})
  }
})

//lisa comment
router.post('/article/:id/comment', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const options = { new: true }; 
    
    const data = new Comment({
      date: new Date(),
      content: req.body.content,//päring kommenti sisu
      article: id
  })

    data.save(async (err, comment) => {
      const result = await Article.findByIdAndUpdate(
        { _id: id }, 
        { $push: { //lisa comment id art komment loendisse
            comments: comment._id
          }
        }, options
      )
  
      res.send(result)
    });
  }
  catch(error){
    res.status(500).json({message: error})
  }
})
//saab artikli comment
router.get('/article/:id/comment', async (req: Request, res: Response) => {
  try{
    const id = req.params.id;

    const result = await Article.findById(id).populate("comments");//artikkel koos comment
  
    res.send(result);
  }
  catch(error){
    res.status(500).json({message: error})
  }
})


export default router;