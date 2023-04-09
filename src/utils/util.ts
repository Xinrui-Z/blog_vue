export function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      let fileResult = "";
      reader.readAsDataURL(file);

      reader.onload = function() {
        fileResult = reader.result;
      };

      reader.onerror = function(error) {
        reject(error);
      };

      reader.onloadend = function() {
        resolve(fileResult);
      };
    });
  }