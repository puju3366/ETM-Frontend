import React, { useState } from "react";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../_metronic/_partials/controls";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { element } from "prop-types";

const ModuleList = ({ modules, rights, onChange, allrights, onSelectAll, all, allLength }) => {
    const [recentlyChecked, setRecentlyChecked] = useState(0);

    const onChildChange = (e, allrights, right_slug, module_slug) => {
        setRecentlyChecked(module_slug);
        onChange(e, allrights, right_slug, module_slug);
    }

    var modulesarr = [];
    modules && modules.map((m) => {
        modulesarr.push(m)
    })
    var rightsarr = [];
    rights && rights.map((r) => {
        rightsarr.push(r)
    })
    // const results = rightsarr.filter(({ moduleID: id1 }) => modulesarr.some(({ _id: id2 }) => id1 === id2));
    // let customers = [];
    // customers = results.reduce((dict, data) => {
    //     console
    //     if (!dict[data.module_id]) dict[data.module_id] = [];
    //     dict[data.module_id].push(data);
    //     return dict;
    // }, []);
    // console.log('37', customers)


    const isCheckBoxChecked = (moduleKey, rightsKey) => {
        let isChecked = false;
        if (allrights && allrights.hasOwnProperty(moduleKey) &&
            allrights[moduleKey].indexOf(rightsKey) !== -1) {
            isChecked = true;
        }

        return isChecked;
    }

    const isCheckedAllChecked = (moduleId, slug) => {
        let uncheckCount = 1;
        if (rights) {
            const getAllRights = rights.filter(item => item.module_id == moduleId);
            if (allrights && allrights[slug] && getAllRights && getAllRights.length > 0) {
                uncheckCount = 0;
                getAllRights.forEach(item => {
                    if (allrights[slug] && allrights[slug].indexOf(item.slug) == -1) {
                        uncheckCount++;
                    }
                })
            }
        }

        return (uncheckCount > 0) ? false : true;
    }

    return (<>
        {(modules || []).map((module) => {
            const module_slugs = module.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            return (
                <div key={`${'modules_' + module.value}`} className="card-group col-md-6 mb-2" >
                    <Card className="card border-secondary card-line" style={{ border: "1px solid black" }} >
                        <CardHeader title={module.name} />
                        <CardBody className='row' >
                            <FormControl component="fieldset" className="col-md-6" style={{ paddingLeft: "2rem" }} key={module.value + "fc"}>
                                <FormGroup name={module.slug} key={module.value} >
                                    <FormControlLabel
                                        control={<Checkbox
                                            name="all"
                                            key="all"
                                            checked={isCheckedAllChecked(module.value, module.slug)}
                                            onChange={(e) => onSelectAll(e, module.value, module.slug)}
                                            // onchange={onSelectAll}
                                            value="all"
                                        />}
                                        label="All"
                                    />
                                    {(rights || []).map((r) => {
                                        const module_slug = r.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                        if (module.value === r.module_id) {
                                            return <FormControlLabel
                                                key={`${'rights_' + r.value}`}
                                                control={
                                                    <Checkbox
                                                        name="rights"
                                                        key={r.slug}
                                                        id={r.slug}
                                                        checked={isCheckBoxChecked(module.slug, r.slug)}
                                                        onChange={(e) => onChildChange(e, allrights, r.slug, module_slugs)}
                                                        multiple={true}
                                                        value={r.slug}
                                                    />
                                                }
                                                label={r.name}
                                            />
                                        }
                                    })}

                                </FormGroup>
                            </FormControl>
                        </CardBody>
                    </Card>
                </div>
            )
        })}
    </>
    )
}

export default ModuleList