import DefaultDesign from './v1';
import AbstractObject, { IConstructorArgs } from './__abstraction';

export type IGraphUninitializeObject = new (
  dataParams: IConstructorArgs
) => typeof AbstractObject;

const des: IGraphUninitializeObject = {
  DefaultDesign
};

export default des;
