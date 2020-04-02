import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class calender extends Component {
  render() {
    return (
      <>
        <HtmlHead
          prefixTitle="ปฏิทินกิจกรรม สำหรับบุคลากร"
          path="personal/calender"
        />
        <DefaultLayout>
          <div className="text-center" style={{ overflow: "auto" }}>
            <iframe
              src="https://calendar.google.com/calendar/b/2/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FBangkok&amp;src=M2VvM2oyZzk0YjNvZmQ5dXE3azVtbjJmamtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dGgudGgjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23AD1457&amp;color=%230B8043"
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </DefaultLayout>
      </>
    );
  }
}
