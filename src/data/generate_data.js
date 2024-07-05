export const generateDummyData = (numRecords) => {
  const dealStages = ["Lead", "Negotiation", "Closed Won", "Closed Lost"];
  const sources = ["Website", "Referral", "Social Media", "Email Campaign"];
  const industries = ["Technology", "Healthcare", "Finance", "Retail"];
  const regions = ["North America", "Europe", "Asia", "Australia"];
  const priorities = ["High", "Medium", "Low"];
  const statuses = ["Active", "Inactive"];
  const communicationChannels = ["Email", "Phone", "In-Person"];
  const dealTypes = ["New Business", "Renewal"];
  const products = ["Product A", "Product B", "Product C"];
  const yesNo = [true, false];
  
  function randomChoice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  function randomText() {
      return Math.random().toString(36).substring(7);
  }

  const data = [];

  for (let i = 0; i < numRecords; i++) {
      data.push({
          "Deal ID": i + 1,
          "Contact Name": `Contact ${i + 1}`,
          "Company Name": `Company ${i + 1}`,
          "Email": `contact${i + 1}@example.com`,
          "Phone Number": `123-456-789${i}`,
          "Deal Stage": randomChoice(dealStages),
          "Deal Value": parseFloat((Math.random() * 10000).toFixed(2)),
          "Close Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Last Contact Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Next Follow-up Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Notes": randomText(),
          "Assigned To": `Salesperson ${Math.floor(Math.random() * 10) + 1}`,
          "Source": randomChoice(sources),
          "Industry": randomChoice(industries),
          "Region": randomChoice(regions),
          "Priority": randomChoice(priorities),
          "Status": randomChoice(statuses),
          "Tags": ["tag1", "tag2", "tag3"],
          "Created Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Modified Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Communication Channel": randomChoice(communicationChannels),
          "Follow-up Count": Math.floor(Math.random() * 10),
          "Deal Type": randomChoice(dealTypes),
          "Product Interest": [randomChoice(products)],
          "Competitor": `Competitor ${Math.floor(Math.random() * 5) + 1}`,
          "Probability of Closing": parseFloat((Math.random() * 100).toFixed(2)),
          "Sales Cycle Length": Math.floor(Math.random() * 180),
          "Meeting Scheduled": randomChoice(yesNo),
          "Proposal Sent Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Contract Sent Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Deal Won Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Deal Lost Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Reason for Loss": randomText(),
          "Renewal Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Lead Source Campaign": `Campaign ${Math.floor(Math.random() * 10) + 1}`,
          "Initial Contact Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Contact Role": `Role ${Math.floor(Math.random() * 10) + 1}`,
          "Decision Maker": randomChoice(yesNo),
          "Customer Segment": `Segment ${Math.floor(Math.random() * 10) + 1}`,
          "Deal Duration": Math.floor(Math.random() * 365),
          "Customer Satisfaction Score": Math.floor(Math.random() * 10) + 1,
          "Renewal Likelihood": parseFloat((Math.random() * 100).toFixed(2)),
          "Customer Feedback": randomText(),
          "Attachments": ["attachment1", "attachment2"],
          "Team Members": [`Member ${Math.floor(Math.random() * 10) + 1}`],
          "Budget": parseFloat((Math.random() * 50000).toFixed(2)),
          "Competitor Pricing": parseFloat((Math.random() * 10000).toFixed(2)),
          "Pain Points": randomText(),
          "Product Demo Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Contract Value": parseFloat((Math.random() * 10000).toFixed(2)),
          "Implementation Start Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Implementation End Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Service Level Agreement": `SLA ${Math.floor(Math.random() * 10) + 1}`,
          "Training Required": randomChoice(yesNo),
          "Training Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Support Contact": `Support ${Math.floor(Math.random() * 10) + 1}`,
          "Onboarding Status": randomChoice(["Completed", "In Progress", "Pending"]),
          "Product Usage Frequency": randomChoice(["Daily", "Weekly", "Monthly"]),
          "Churn Risk": parseFloat((Math.random() * 100).toFixed(2)),
          "Referral Potential": randomChoice(["High", "Medium", "Low"]),
          "Case Studies Available": randomChoice(yesNo),
          "Case Study Date": randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
          "Event Participation": ["Event1", "Event2"],
          "Marketing Material Sent": randomChoice(yesNo),
          "Custom Field 1": randomText(),
          "Custom Field 2": randomText(),
          "Custom Field 3": randomText(),
          "Custom Field 4": randomText(),
          "Custom Field 5": randomText(),
      });
  }
  
  return data;
}

