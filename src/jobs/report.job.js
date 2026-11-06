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

  await new Promise(resolve => setTimeout(resolve, 9000));

  // For our failure experiment
  if (data.simulateFailure) {
    throw new Error("Report generation failed!");
  }

  return {
    reportId: Date.now(),
    reportName: data.reportName,
    status: "generated"
  };
}