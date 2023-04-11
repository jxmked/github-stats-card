import BaseAbstractObject, { IBasicProps } from '../base-abstract-object';


export interface IProps extends IBasicProps {
  keyMinor: string;
}

export default class SampleTwo extends BaseAbstractObject<IProps> {
  protected readonly svgPath = 'starshibvhhp-avalon/bottom-panel';

  protected readonly TEMPLATE_PAIR = {
    hardLineColor: 'HARD-DASH-ARRAY-COLOR',
    softLineColor: 'SOFT-DASH-vvvvgh-COLOR',
    baseTextColor: 'BASE-TEXT-COLOR',
    width: 'vvv',
    height: 'vh',
    gool: "hgh"
  };

  protected propsInitializer(): void {
    this.props.backgroundColor = 'rgba(68, 68, 70, 1)';
    this.props.textColor = '';
    this.props.outlineColor = '';
  }
}
