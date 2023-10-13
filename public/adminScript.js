const showImages = (  ) => {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    document.getElementById('imagePreview').innerHTML = null;
    const selectedImage = imageInput.files   
    for(let i =0; i < selectedImage.length; i++)
    {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(selectedImage[ i ]);
        image.style.width = "150px";
        image.style.margin = "3px";
        imagePreview.appendChild( image);
    }
}