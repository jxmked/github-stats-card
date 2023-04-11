import BaseAbstractObject, { IBasicProps } from '../base-abstract-object';


export interface IProps extends IBasicProps {}

export default class Card_StarShipAvalon extends BaseAbstractObject<IProps> {
  protected readonly svgPath = 'starship-avalon/bottom-panel';

  protected readonly TEMPLATE_PAIR = {
    hardLineColor: 'HARD-DASH-ARRAY-COLOR',
    softLineColor: 'SOFT-DASH-ARRAY-COLOR',
    baseTextColor: 'BASE-TEXT-COLOR',
    width: 'WIDTH',
    height: 'HEIGHT'
  };

  protected propsInitializer(): void {
    this.props.backgroundColor = 'rgba(68, 68, 70, 1)';
    this.props.textColor = '';
    this.props.outlineColor = '';
  }
}
