import React from 'react';
import Leave from '../leave';
import { Linking } from 'react-native';

export default function LeaveTab() {
  // Function to handle automatic email sending when complaint is submitted
  const handleComplaintSubmit = (complaintData) => {
    // Get complaint details from the Leave component
    const { startDate, endDate, leaveType, halfDayOption, reason } = complaintData;
    
    // Format the leave type for email
    const leaveTypeText = leaveType === "singleDay" ? 
      `Single Day Leave (${halfDayOption === "forenoon" ? "Forenoon" : "Afternoon"})` : 
      "Medical Leave";
    
    // Create email subject and body
    const subject = `Hostel Complaint: ${leaveTypeText}`;
    const body = `Complaint Details:
- Type: ${leaveTypeText}
- From: ${startDate.toDateString()}
- To: ${endDate.toDateString()}
- Reason: ${reason}

Thank you for your attention to this matter.`;

    // Create mailto URL with recipient email
    const mailtoUrl = `mailto:mathesh8940@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client automatically
    Linking.openURL(mailtoUrl).catch(err => 
      console.error('Failed to open email client', err)
    );
  };

  // Pass the email handler to the Leave component
  return <Leave onSubmitComplaint={handleComplaintSubmit} />;
}