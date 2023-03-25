import DefaultDesign from './v1';
import AbstractObject, { IConstructorArgs, IFuck } from './__abstraction';

export type IGraphUninitializeObject = new (
  dataParams: IConstructorArgs
) => IFuck;

const des= {
  DefaultDesign
};

export default des;
