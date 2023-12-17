const accordionItems = document.querySelectorAll(".accordion__item");

accordionItems.forEach(item =>
  item.addEventListener("click", () => {
    const isItemOpen = item.classList.contains("open");
    accordionItems.forEach(item => item.classList.remove("open"));
    if (!isItemOpen) {
      item.classList.toggle("open");
    }
  })
);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhY2NvcmRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYWNjb3JkaW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGlvbl9faXRlbVwiKTtcblxuYWNjb3JkaW9uSXRlbXMuZm9yRWFjaChpdGVtID0+XG4gIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBpc0l0ZW1PcGVuID0gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuXCIpO1xuICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpKTtcbiAgICBpZiAoIWlzSXRlbU9wZW4pIHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIik7XG4gICAgfVxuICB9KVxuKTsiXSwiZmlsZSI6ImFjY29yZGlvbi5qcyJ9
