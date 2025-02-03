window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["node", "chrome", "electron"]) {
    replaceText(
      `${dependency}-version`,
      asString(process.versions[dependency]),
    );
  }
});

console.log("process: ", { process });

function asString(value: string | undefined): string {
  return value || "unknown";
}
