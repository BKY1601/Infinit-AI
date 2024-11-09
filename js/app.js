const API_KEY = ",";
const button = document.querySelector("#subscribe-button");
const inputElement = document.querySelector("form");
const imageSection = document.querySelector('.images-section')

let prompt = inputElement.value; // Initialize prompt with current input value

const getImages = async () => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      n: 4,
      size: "1024x1024",
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();
    data?.data.forEach(imageObject => {
        const ImageContainer = document.createElement('div')
        ImageContainer.classList.add('image-container')
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src',imageObject.url)
        ImageContainer.append(imageElement)
        imageSection.append(ImageContainer)

    });
    
  } catch (error) {
    console.error(error);
  }
};

inputElement.addEventListener("input", (event) => {
  prompt = event.target.value; // Update prompt whenever input value changes
});

button.addEventListener("click", getImages);
