function getBase64Image(img) {
  var canvas = document.createElement("canvas");
    canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL();
  return dataURL;
}

var base64 = getBase64Image(document.getElementById("img"));

var imgData = base64;

var doc = new jsPDF();

doc.setFontSize(40);

doc.text(45,45,"Hola, esto es una imagen");

doc.addImage(imgData,'JPEG',45,45,150,150);

doc.save('probando.pdf');