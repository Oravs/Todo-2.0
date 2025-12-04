const $input = $("#input");
const $list = $("#theList");
const $num = $("#count");

// Add item
function addItem() {
    const val = $input.val().trim();
    if (!val) return $("#theForm").css("border", "3px solid red"), alert("Write something!");

    $list.append(`<li>${val}<span></span></li>`);
    $input.val("");
    storeData();
}

// Toggle check / delete
$list.on("click", "li, span", function () {
    $(this).is("li") ? $(this).toggleClass("checked") : $(this).parent().remove();
    storeData();
});

// LocalStorage
function storeData() {
    localStorage.setItem("item", $list.html());
}
function showPrevious() {
    $list.html(localStorage.getItem("item") || "");
}
showPrevious();

// Generic filter function
function filterList(showChecked = null) {
    $list.children("li").each(function () {
        const checked = $(this).hasClass("checked");
        $(this).toggle(showChecked === null || checked === showChecked);
    });
}
function showAll()       { filterList(null); }
function showUnclicked() { filterList(false); }
function showClicked()   { filterList(true); }

// Clear
function clearAll() {
    $list.empty();
    localStorage.removeItem("item");
    $num.text("0");
    updateCounter();
}

// Counter
function updateCounter() {
    const visible = $list.children("li:visible").length;
    $num.text(`Total: ${visible}`);
}

// Observe changes
new MutationObserver(updateCounter).observe($list[0], {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"]
});

updateCounter();
