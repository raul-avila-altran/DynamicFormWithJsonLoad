import saveAs from "file-saver";

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function downloadResults(values) {
  const blob = new Blob([values], {
    type: "application/json; charset=utf-8"
  });
  saveAs(blob, "workflow.json");

  //await sleep(500); // simulate server latency
  //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
});
