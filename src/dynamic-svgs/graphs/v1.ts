import ParentClass, { IBasicGraph } from './__abstraction';

/**
 * Style - Default value
 * */

export interface IProps extends IBasicGraph {
  hardLineColor: string;
  softLineColor: string;
}

export default class V1 extends ParentClass<IProps> {
  
  
  protected readonly svgPath = "graphs/v1"
  
  constructor() {
    super();
    
    
    this.props.hardLineColor = ""
    this.props.softLineColor = ""
  }
  
  public render(): string {
    return ""
  }
}