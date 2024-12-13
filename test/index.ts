import tools from "../src/index";

const delegate = (
  {
    type = 0,
    nodeId,
    amount,
  }: { type: number; nodeId: string; amount: string | number | bigint },
  adr: string
) => {
  try {
    const param = tools.getParams(1004, adr, [type, nodeId, amount]);
  } catch (error) {
    console.log("error", error);
  }
};
