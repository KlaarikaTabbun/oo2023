import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/hello-world", (req: Request, res: Response) => {
    res.send("Hello world at " + new Date())
});

router.get("/hello-variable/:nimi", (req: Request, res: Response) => {
  res.send("Hello " + req.params.nimi)
});

router.get("/add/:nr1/:nr2", (req: Request, res: Response) => {
  res.send(req.params.nr1 + req.params.nr2)
});

router.get("/multiply/:nr1/:nr2", (req: Request, res: Response) => {
  const nr1 = Number(req.params.nr1);
  const nr2 = Number(req.params.nr2);
  res.send((nr1 * nr2).toString());
});

//iseseisev
router.get("/random/:min/:max", (req: Request, res: Response) => {
	const min = Number(req.params.min);
	const max = Number(req.params.max);
	res.send((Math.round((Math.random() * (max-min)+min))).toString());
});

router.get("/age/:yearOfBirth", (req: Request, res: Response) => {
    const yearOfBirth = parseInt(req.params.yearOfBirth);
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearOfBirth;
    const birthdayHasPassed = new Date().getTime() >= new Date(currentYear, 0, 1).setFullYear(yearOfBirth);
    
    if (birthdayHasPassed) {
        res.send(`Sa oled ${age} aastat vana.`);
    } else {
        res.send(`Sa saad ${age} aastat vanaks.`);
    }
});

export default router;