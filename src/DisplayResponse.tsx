import React, { useEffect, useState } from "react";

export const DisplayResponse: React.FC<
{ response: Response | void | undefined }> 
= ({ response }): JSX.Element => {
    return <div className = "response"> { response?
    <ul className="obj collapsible">
        <li><div className="hoverable">
            <span className="property token string">Status:</span>: <span className="token string"> 
            {response?.status === 204 ? <span >success</span> : <span style={{color: "red"}}> failure</span>} 
            </span><span className="token punctuation">,</span>
            </div>
        </li> { response.status === 204?
        <li><div className="hoverable"><span className="property token string">Ok:</span>: <span className="token string"> {response.ok ? "true" : "false"}</span></div></li> 
        :<li><div className="hoverable"><span className="property token string">Error:</span>: <span className="token string"> {response.statusText} </span></div></li>
        } </ul> : <></>}
    </div>
}

export default DisplayResponse;
