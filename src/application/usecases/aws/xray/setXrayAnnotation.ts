import { XrayToolInterface } from '@Src/domain/interface/aws/xray';
import { Request } from 'express';

export class SetXrayAnnotationUC {
  constructor(private readonly tool: XrayToolInterface) {}
  execute(req: Request, keys: string[]) {
    this.tool.setXrayAnnotationByRequest(req, keys);
  }
}
