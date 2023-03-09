function convert() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const csvText = event.target.result;
      const lines = csvText.split('\n');
      let txtText = '';
        
        

      for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',');
        if (columns.length >= 5) {
          const date = new Date(columns[5]); // parsear el string fecha 
          const formattedDate = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2); // formato YYYYMMDD sin /
          const lastnameAndName = columns[2]+',' + columns[3];// concatena la columna 2 con la 3 ya que al tener una coma despues del apellido lo toma como una columna distinta
          const padEndCount = 53 - 10 - lastnameAndName.length ;
                    
          
          txtText += '29' +  columns[1].padStart(8,'0') + lastnameAndName.replace(/['"]+/g, '') + columns[4].padStart(padEndCount, ' ') + formattedDate + '\n';
  
        }
      }
  
      const outputFileName = file.name.split('.')[0] + '.txt';
      const txtBlob = new Blob([txtText], {type: 'text/plain'});
      const txtUrl = URL.createObjectURL(txtBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = txtUrl;
      downloadLink.download = outputFileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(txtUrl);
    };
  
    reader.readAsText(file);
  }
  
  