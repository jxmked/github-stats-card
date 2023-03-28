import BaseAbstractObject, {IBasicProps} from '../base-abstract-object';

import { IBaseCardObject } from './base-card'


export interface IProps extends IBasicProps {

}

export default class Card_StarShipAvalon extends BaseAbstractObject<IProps> implements IBaseCardObject {
protected readonly svgPath = 'starship-avalon/bottom-panel';

  protected readonly TEMPLATE_PAIR = {
    hardLineColor: 'HARD-DASH-ARRAY-COLOR',
    softLineColor: 'SOFT-DASH-ARRAY-COLOR',
    baseTextColor: 'BASE-TEXT-COLOR',
    commitType: 'COMMIT-TYPE',
    baseOutline: 'BASE-OUTLINE-COLOR',
    maxGraphValue: 'CHART_FULL_GRAPH',
    halfGraphValue: 'CHART_HALF_GRAPH',
    recordRange: 'CHART_FULL_GRAPH'
  };

  protected propsInitializer(): void {
    
    this.props.backgroundColor = ""
    this.props.textColor = ""
    this.props.outlineColor = ""
  }
}