import Template from 'lodash/template.js';
import { SVGGetter } from '../../dynamic-svg-getter';

export interface ICoreProps {
  width: number;
  height: number;
  pos: ICoordinate;
}

export interface ICoreConstructor extends Partial<ICoreProps> {};


export class Core {
  
  private readonly content = SVGGetter('starship-avalon/core');
  private compile: ReturnType<typeof Template>;
  private props: ICoreProps;
  
  constructor(props: ICoreConstructor) {
    this.compile = Template(this.content);
    
    this.props = {
      width: 256,
      height: 256,
      pos: {
        x: 0,
        y: 0
      }
    }
    
  }
  
  
  
  
}