import { Request, Response } from 'express';

export default class ArgParser {
  protected username: string | undefined;
  protected styles: string | undefined;
  protected design: string | undefined;

  constructor() {
    this.username = void 0;
    this.styles = void 0;
    this.design = void 0;
  }

  protected validateUser(): boolean {
    return true;
  }

  protected responseValidation(res: Response): void {}

  protected parseStyles(): void {}

  public handleQueryRequest(req: Request, res: Response): void {
    // Passing: username
    Object.assign(this, req.params);

    const { theme } = req.query;

    res.send(`QUERY ${theme} ${this.username}`);
  }

  public handleParamRequest(req: Request, res: Response): void {
    /**
     * if both theme and params.design is present,
     * theme will be ignored
     * */

    // Passing: design, username
    Object.assign(this, req.params);

    if (!this.validateUser()) {
      this.responseValidation(res);
      return;
    }

    res.send(this.design);
  }
}
