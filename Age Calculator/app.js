function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  const result = document.getElementById("result");

  if (!dobInput) {
    result.innerText = "Please select a valid date.";
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    result.innerText = "Date of birth cannot be in the future.";
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if(days < 0) {
    months--;
    
    const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonthDays;
  } 

  if (months < 0) {
    years--;
    months += 12;
  }

  result.innerText = `You are ${years} years, ${months} months, and ${days} days old.`;
}
