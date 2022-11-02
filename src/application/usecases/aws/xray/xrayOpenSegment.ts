import { XrayToolInterface } from '@Src/domain/interface/aws/xray';

export class XrayOpenSegmentUC {
  constructor(private readonly tool: XrayToolInterface) {}
  execute() {
    return this.tool.openSegment();
  }
}
