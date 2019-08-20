
//Esta función sirve para convertir una imagen en formato BASEG4 (Arreglo de bytes),
//Le pasamos como parámetro el ID de nuestra imagen
function getBase64Image(img) {
  var canvas = document.createElement("canvas");
    canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL();
  return dataURL;
}

//Con esta función generamos nuestro PDF de la estructura HTML
function HTMLtoPDF(){
    //En esta variable se capturar la imagen en formato Base64
    var imgData = getBase64Image(document.getElementById("img"));
    var imgData2 = getBase64Image(document.getElementById("img2"));
    
    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#HTMLtoPDF')[0];
    specialElementHandlers = {
	   '#bypassme': function(element, renderer){
		  return true
	   }
    }
    margins = {
        top: 50,
        left: 60,
        width: 545
    };
    pdf.fromHTML(
  	 source // HTML string or DOM elem ref.
  	 , margins.left // x coord
  	 , margins.top // y coord
  	 , {
  		    'width': margins.width // max width of content on PDF
  		    , 'elementHandlers': specialElementHandlers
  	 },
  	 function (dispose) {
         //Agregamos la imagen a nuestro PDF
         /*Los parámetros de la función addImage son los siguiente
           addImagen(imgData,tipo,x,y,ancho,largo)
           
           1. imgData: Este parámetro es la imagen que colocaremos en nuestro PDF pero en formato base64
           2. tipo: El tipo de imagen que se guardará en nuestro PDF, usualmente se utiliza el tipo JPEG
           3. x: Posicionamiento horizontal de la imagen
           4. y: Posicionamiento vertical de la imagen
           5. ancho: Ancho que definiremos para nuestra imagen
           6. largo: Largo que definiremos para nuestra imagen
         */
         pdf.addImage(imgData,'JPEG',537,0,75,75);
         pdf.addImage(imgData2,'JPEG',0,0,75,75);
         
         //Obtener el ancho de nuestro documento PDF
         var width = pdf.internal.pageSize.width;
         
         //Obtener el largo de nuestro documento PDF
         var height = pdf.internal.pageSize.height;
         
  	     // dispose: object with X, Y of the last line add to the PDF
  	     //          this allow the insertion of new lines after html
        pdf.save('html2pdf.pdf');
      }
  )		
}