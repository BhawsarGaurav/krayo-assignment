import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { myBucket } from "../AwsConfig";
import { useNavigate } from "react-router";
function Dashboard() {
  const [file, setFile] = useState("");
  const [user, setUser] = useState({});
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const BUCKETNAME = "test-krayo";
  const REGION = "ap-south-1";
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user"));

    if (data == null) {
      navigate("/");
    }
    console.log(data.emails[0].value);
    setUser(data);
    const params = {
      Bucket: BUCKETNAME,
    };
    myBucket.listObjects(params, (err, res) => {
      if (err) console.log(err);
      else {
        // console.log(res.Contents);
        setUploadedFiles(res.Contents);
      }
    });
  }, [count]);
  const handler = (e) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  const uploadFile = () => {
    let fileName = `${user.emails[0].value}-${file.name}`;
    // console.log(fileName);
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: BUCKETNAME,
      Key: fileName,
    };
    myBucket
      .putObject(params)
      .on("httpDone", (evt) => {
        alert("File Uploaded Successfully!!!!!");
        console.log(evt);
        setCount(count + 1);
        document.getElementById("input").value = "";
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };
  const logout = () => {
    window.open(`http://localhost:4000/auth/logout`, "_self");
  };
  return (
    <div>
      <Button onClick={() => logout()}>Logout</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles &&
            uploadedFiles
              .filter((x) => {
                if (x.Key.includes(user.emails[0].value)) return true;
              })
              .map((ele, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ele?.Key?.split("-")[1]}</td>
                  <td>
                    <Button
                      href={`https://${BUCKETNAME}.s3.${REGION}.amazonaws.com/${ele.Key}`}
                    >
                      {" "}
                      Download{" "}
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>

      <Form>
        <Form.Control
          id="input"
          type="file"
          placeholder="Upload Here"
          onChange={(e) => handler(e)}
          name="file"
        />
        <Button onClick={() => uploadFile()} variant="primary">
          Upload File
        </Button>
      </Form>
    </div>
  );
}

export default Dashboard;
