function addNewEntry() {
    // The element where the extra inputs should 
    // be appended.
    const insertElement = document.querySelector("#activities-input-list");
    // The element which will be appended.
    const elementToInsert = `
        <div id="activities-input">
            <textarea rows="3" cols="20" placeholder="Aktivität"></textarea>
            <textarea rows="3" cols="20" placeholder="Zeitdauer"></textarea>
            <button type="button" onclick="addNewEntry()">+</button> 
        </div>
    `;
    // Append the element inside InsertElement.
    insertElement.insertAdjacentHTML("beforeend", elementToInsert)
}