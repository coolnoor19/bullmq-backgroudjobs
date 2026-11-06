// export async function generateReport(data) {
//   console.log("Generating report...");
//   console.log("Report details:", data);

//   await new Promise(resolve => {
//     setTimeout(resolve, 5000);
//   });

//   console.log("Report generated successfully!");

//   return {
//     reportId: Date.now(),
//     status: "generated"
//   };
// }

export async function generateReport(data) {
  console.log("Generating report:", data.reportName);

  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log("Report generated!");

  return {
    status: "generated",
    reportName: data.reportName
  };
}