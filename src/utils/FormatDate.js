export default function formatDate(input) {
  var datePart = input.match(/\d+/g),
  year = datePart[0], 
  month = datePart[1], 
  day = datePart[2],
  hour = datePart[3],
  minute = datePart[4];

  return day+'/'+month+'/'+year+' - '+hour+'h'+minute+'m';
}