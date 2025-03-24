// تابعی برای به روزرسانی اطلاعات بیمار  
function updatePatientInfo() {
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const gender = document.querySelector('select[name="gender"]').value;
    const nationalId = document.querySelector('input[name="nationalId"]').value;

    // ساخت متن مناسب بر اساس جنسیت  
    if (gender === 'مرد') {
        patientInfo = `بیمار: آقای ${firstName} ${lastName} (کد ملی: ${nationalId})`;
    } else {
        patientInfo = `بیمار: خانم ${firstName} ${lastName} (کد ملی: ${nationalId})`;
    }

    document.getElementById('patientInfo').innerText = patientInfo;

}

// به محض بارگذاری صفحه، اطلاعات بیمار را به روزرسانی کنید  
document.addEventListener('DOMContentLoaded', updatePatientInfo);

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();  // جلوگیری از باز شدن منوی راست‌کلیک
});
//_____________________________________________

function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const title = content.querySelector('.expanding-section'); // Get the title element within the content  

    if (content) {
        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    }
}

function toggleSectionMain(sectionId, menuName) {
    const allSections = document.querySelectorAll('.content2');

    allSections.forEach(section => {
        section.style.display = 'none';
    });

    // Reset all menu items background color  
    const allMenuItems = document.querySelectorAll('.expanding-section');
    allMenuItems.forEach(item => {
        item.style.backgroundColor = 'blue'; // Resetting background color  
    });

    // Show the selected section  
    const content = document.getElementById(sectionId);
    if (content) {
        content.style.display = "block";
    }

    if (menuName) {
        const menuItem = document.getElementById(menuName);
        if (menuItem) {
            menuItem.style.backgroundColor = 'red'; // Set to grey for clicked item  
        }
    }
}
/**
 * Initialize Persian date pickers for specified fields
 * @param {string[]} datePickerIds - Array of element IDs to initialize Persian date picker on
 */
function initializePersianDatePickers(datePickerIds) {
    datePickerIds.forEach(id => {
        $(`#${id}`).persianDatepicker({
            format: "YYYY/MM/DD", // Date format
            calendarType: "persian", // Persian calendar
            autoClose: true, // Close calendar after date selection
            maxDate: new persianDate(), // Limit date to today
            onSelect: function (date) {
                console.log(`Selected Date: ${new persianDate(date).format('YYYY/MM/DD')}`);
            }
        });
    });
}

/**
 * Enable or disable form fields based on a checkbox state
 * @param {string} checkboxName - Name attribute of the checkbox
 * @param {string[]} fieldNames - Array of name attributes of fields to enable/disable
 */

function toggleFormFields(checkboxName, fieldNames) {
    const checkbox = document.getElementsByName(checkboxName)[0];
    if (checkbox) {
        checkbox.addEventListener('change', function () {
            fieldNames.forEach(fieldName => {
                const field = document.getElementsByName(fieldName)[0];
                if (field) {
                    field.disabled = checkbox.checked;
                }
            });
        });
    }
}

function toggleFormFieldsEnable(checkboxName, fieldNames) {
    const checkbox = document.getElementsByName(checkboxName)[0];
    if (checkbox) {
        checkbox.addEventListener('change', function () {
            fieldNames.forEach(fieldName => {
                const field = document.getElementsByName(fieldName)[0];
                if (field) {
                    field.disabled = !(checkbox.checked);
                }
            });
        });
    }
}

/**
 * Enable or disable a dropdown based on another dropdown value
 * @param {string} triggerId - ID of the trigger dropdown
 * @param {string} targetId - ID of the target dropdown
 * @param {string} enableValue - Value that enables the target dropdown
 */
function toggleDropdown(triggerId, targetId, enableValue) {
    const triggerDropdown = document.getElementById(triggerId);
    const targetDropdown = document.getElementById(targetId);

    if (triggerDropdown && targetDropdown) {
        triggerDropdown.addEventListener('change', function () {
            if (triggerDropdown.value === enableValue) {
                targetDropdown.disabled = false;
            } else {
                targetDropdown.disabled = true;
                targetDropdown.selectedIndex = 0; // Reset to default
            }
        });
    }
}



/**
 * Toggle the visibility of additional X-ray details
 * @param {string} triggerId - ID of the dropdown
 * @param {string} detailsId - ID of the details section
 */
function toggleXrayDetails(triggerId, detailsId) {
    const trigger = document.getElementById(triggerId);
    const details = document.getElementById(detailsId);

    if (trigger && details) {
        trigger.addEventListener('change', function () {
            details.style.display = trigger.value === "abnormal" ? "block" : "none";
        });
    }
}

// Call toggleXrayDetails for each X-ray type
document.addEventListener("DOMContentLoaded", () => {
    toggleXrayDetails('chestXray', 'chestXrayDetails');
    toggleXrayDetails('pelvisXray', 'pelvisXrayDetails');
    toggleXrayDetails('neckXray', 'neckXrayDetails');
});
//___________________________________________

//tab items
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tablinks');
    const tabContents = document.querySelectorAll('.tabcontent');

    // Function to show the active tab
    function showTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        const activeContent = document.getElementById(tabId);
        activeContent.classList.add('active');

        tabButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.tab === tabId) {
                button.classList.add('active');
            }
        });
       
        // Restore the scroll position for the currently active tab
        const scrollPos = localStorage.getItem(`${tabId}-scrollPos`);
        if (scrollPos) {
            activeContent.scrollTop = scrollPos; // Set the scroll position
        }


        initializePersianDatePickers(['persianDatapicker1', 'emergencyArrivalDate', 'emergencyDepartureDate','accidentDate']);
        ///^^^^
    }

    // Load the last active tab from localStorage
    const lastActiveTab = localStorage.getItem('activeTab') || 'tab1';
    showTab(lastActiveTab);

    // Add event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            showTab(tabId);
            // Store the active tab in localStorage
            localStorage.setItem('activeTab', tabId);
        });
    });

    // Store the scroll position when the user scrolls
    tabContents.forEach(tab => {
        tab.addEventListener('scroll', () => {
            localStorage.setItem(`${tab.id}-scrollPos`, tab.scrollTop);
        });
    });
});



// Initialization logic
$(document).ready(function () {
    // Initialize Persian date pickers
    initializePersianDatePickers(['persianDatapicker1', 'emergencyArrivalDate', 'emergencyDepartureDate']);

    // Toggle vital signs fields
    toggleFormFields('noVitalSignsEntry', ['bloodPressureSiztolic', 'bloodPressureDiastolic', 'heartRateEntry', 'respiratoryRateEntry','oxygenSaturationEntry']);
    toggleFormFields('noVitalSignsExit', ['bloodPressureSiztolicOut', 'bloodPressureDiastolicOut', 'heartRateExit', 'respiratoryRateExit','oxygenSaturationExit']);

    toggleFormFields('airwayOpenArrival', ['intubatedArrival', 'airwayBlockedArrival', 'potentialAirwayLoss']);
    toggleFormFields('normalBreathing', ['respiratoryDistress', 'trachealDeviation']);
    toggleFormFields('patientTransferDie', ['deathReason1', 'deathReason2', 'deathReason3', 'deathReason4', 'deathReason5']);
  
    toggleFormFields('trachealDeviation1', ['pneumothoraxPressureRight', 'pneumothoraxPressureLeft', 'suctionWoundRight', 'suctionWoundLeft', 'floatingChestRight', 'floatingChestLeft', 'pneumothoraxPressureRight', 'pneumothoraxPressureLeft', 'chestWallInjuryRight','chestWallInjuryLeft']);
    // Toggle death reason dropdown
    toggleDropdown('patientTransfer', 'deathReason', 'deceased');

    // Initialize other behaviors
    document.getElementById('noEmsCheckbox')?.addEventListener('change', function () {
        document.getElementById('emsArrivalTime').disabled = this.checked;
    });

    document.getElementById('noBleedControlId')?.addEventListener('change', function () {
        document.getElementById('bleedControlId').disabled = this.checked;
    });
});

//________________

function toggleTableBreathing() {
    // Get the Abnormal radio button and the table  
    const abnormalRadio = document.getElementById('trachealDeviation2');
    const detailsTable = document.getElementById('respiratory');

    // Check if the Abnormal radio button is selected  
    if (abnormalRadio.checked) {
        detailsTable.style.display = 'table'; // Show the table  
    } else {
        detailsTable.style.display = 'none'; // Hide the table  
    }
}
//___________________
function toggleTable() {
    // Get the Abnormal radio button and the table  
    const abnormalRadio = document.getElementById('chestXrayAbnormal');
    const detailsTable = document.getElementById('chestXrayDetails');

    // Check if the Abnormal radio button is selected  
    if (abnormalRadio.checked) {
        detailsTable.style.display = 'table'; // Show the table  
    } else {
        detailsTable.style.display = 'none'; // Hide the table  
    }
}

// Attach event listeners to all chestXray radio
document.querySelectorAll('input[name="chestXray"]').forEach((radio) => {
    radio.addEventListener('change', toggleTable);
});
//____________________
// Attach event listeners to all respiratory  radio buttons  
document.querySelectorAll('input[name="trachealDeviation2"]').forEach((radio) => {
    radio.addEventListener('change', toggleTableBreathing);
});
//__________________
function toggleSelects(value) {
    // انتخاب تمام سلکت‌های ناحیه  
    const areaSelects = document.querySelectorAll('.areaSelect');

    if (value === 'اندیکاسیون ندارد' || value === 'منفی') {
        // اگر گزینه "اندیکاسیون ندارد" انتخاب شده باشد، غیر فعال کردن  
        areaSelects.forEach(select => {
            select.disabled = true;
        });
    } else {
        // در غیر این صورت، فعال کردن  
        areaSelects.forEach(select => {
            select.disabled = false;
        });
    }
}