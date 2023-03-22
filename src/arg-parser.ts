import { Request, Response } from 'express';


export  default class ArgParser {
  
  protected username:string|undefined;
  protected styles:string|undefined;
  protected theme: string|undefined;
  
  constructor() {
    this.username = void 0;
    this.styles = void 0;
    this.theme = void 0;
  }
  
  protected validateUser(): boolean {
    return true;
  }
  
  protected responseValidation(res:Response): void {
    
  }
  
  protected parseStyles(): void {
    
  }
  
  public handleEvent(req: Request, res: Response): void  {
    this.username = req.params.username;
    this.styles = req.params.styles;
    this.theme = req.query.theme;
    
    // Prioritize Custom Design
    if(this.styles !== void 0) {
      
    }
    
    if(! this.validateUser()){
      this.responseValidation(res);
      return;
    }
    
    
    res.send("")
  }
}