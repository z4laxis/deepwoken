async function getIconByName(categoryName) {
  try {
    const response = await fetch("/assets/json/classes-icon.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const category = data.find(item => item.name === categoryName);

    if (category) {
      return category.icon;
    } else {
      return "Category not found.";
    }
  } catch (error) {
    console.error("Error fetching or processing JSON:", error);
    return "Error fetching data.";
  }
}