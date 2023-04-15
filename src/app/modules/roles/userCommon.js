/**
 * @function: getSelectedRights
 * @author: DEVIT
 * @description: this method used for extract rights as per selected roles
 * @params: userRights: array, filterKeys: array
 */
const getSelectedRights = (userRights, filterKeys) => {
    if (userRights && userRights.length > 0) {
        return userRights.filter(item => filterKeys.indexOf(item.id) !== -1);
    } else {
        return [];
    }
}

/**
 * @function: checkInternalModule
 * @author: DEVIT
 * @description: this method used for check and add new rights if not found
 * @params: oldPermission: array, internalArray: array
 */
export const checkInternalModule = (oldPermission, internalArray) => {
    internalArray.forEach(item => {
        if (oldPermission.indexOf(item) == -1) {
            oldPermission.push(item);
        }
    })

    return oldPermission;
}

/**
 * @function: generateUniquePermission
 * @author: DEVIT
 * @description: this method used for check and update the permission array from previous array
 * @params: oldPermission: array, newRights: array
 */
const generateUniquePermission = (oldPermission, newRights) => {
    let extactNewRights = JSON.parse(newRights);
    if (extactNewRights.length > 0) {
        Object.entries(extactNewRights[0]).forEach(([key, value]) => {
            if (!oldPermission.hasOwnProperty(key)) {
                oldPermission[key] = [];
            }

            oldPermission[key] = checkInternalModule(oldPermission[key], value)
        });
    }

    return oldPermission;
}

/**
 * @function: createPermissionObject
 * @author: DEVIT
 * @description: this method used for extract roles array and generate a 
 * new array with uniques modules and rights
 * @params: selectedRolesObj: array
 */
const createPermissionObject = (selectedRolesObj) => {
    return selectedRolesObj.reduce((prevVal, iterateVal) => {
        if (iterateVal && iterateVal.rights && iterateVal.rights != '') {
            prevVal.push({ ...generateUniquePermission(prevVal, iterateVal.rights) });
        }
        return prevVal;
    }, []);
}

/**
 * @function: createCommonRights
 * @author: DEVIT
 * @description: this method used to create a permission array for user module
 * @params: fnParams: array
 */
export const createCommonRights = (...fnParams) => {
    const selectedRoleIds = fnParams[0];
    const userRights = fnParams[1];
    const getSelectedKeys = selectedRoleIds.map(item => Number(item.value));
    const getSelectedRightsArray = getSelectedRights(userRights, getSelectedKeys);

    if (getSelectedRightsArray.length > 0) {
        return createPermissionObject(getSelectedRightsArray);

    } else {
        return [];
    }
}

/**
 * @function: checkNewCheckBox
 * @author: DEVIT
 * @description: this method used to check/uncheck checkbox for right module
 * @params: fnParams: array
 */
export const checkNewCheckBox = (checked, permission, module_slug, key) => {
    if (checked) {
        if (!permission) {
            permission = {};
        }
        if (!permission[module_slug]) {
            permission[module_slug] = [];
        }
        permission[module_slug].push(key);
    } else {
        if (permission[module_slug] && permission[module_slug].indexOf(key) !== -1) {
            permission[module_slug].splice(permission[module_slug].indexOf(key), 1)
        }

        if (permission[module_slug] && permission[module_slug].length == 0) {
            delete permission[module_slug];
        }

    }

    return permission;
}
