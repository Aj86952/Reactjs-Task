import React, { useState, useEffect } from "react";

const getLocalData = () => {
  let list = localStorage.getItem("taskData");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
function Task() {
  const [data, setData] = useState({
    first: "",
    last: "",
    gender: "",
    education: "",
    state: "",
    division: "",
    district: "",
    taluka: "",
    village: "",
  });
  // const [allData, setAllData] = useState([]);
  const [allData, setAllData] = useState(getLocalData());
  const [editData, setEditData] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    if (
      data.first === "" ||
      data.last === "" ||
      data.gender === "" ||
      data.education === "" ||
      data.state === "" ||
      data.division === "" ||
      data.district === "" ||
      data.taluka === "" ||
      data.village === ""
    ) {
      alert("All feilds are mandatory");
    } else if (data && toggleBtn) {
      setAllData(
        allData.map((currentVal, id) => {
          if (currentVal.id === editData) {
            return { ...currentVal, input: data };
          } else {
            return currentVal;
          }
        })
      );
      setData([]);
      setEditData(null);
      setToggleBtn(false);
    } else {
      let myData = {
        id: new Date().getTime().toString(),
        input: data,
      };
      setAllData([...allData, myData]);
    }
  };

  const handleRest = () => {
    setData("");
  };

  const handleDelete = (id) => {
    let updatedData = allData.filter((currentVal) => currentVal.id !== id);
    setAllData(updatedData);
  };

  const handleEdit = (id) => {
    const editedData = allData.find((currentVal) => currentVal.id === id);
    setData(editedData);
    setEditData(id);
    setToggleBtn(true);
  };

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(allData));
  }, [allData]);

  return (
    <div className="container">
      <form>
        <h1 className="mb-4">Personal Information</h1>
        <div className="d-flex justify-content-around mb-3">
          <input
            type="text"
            placeholder="First Name"
            name="first"
            value={data.first}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last"
            value={data.last}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-evenly mb-3">
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              onChange={handleChange}
              checked={data.gender === "Male"}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              onChange={handleChange}
              checked={data.gender === "Female"}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="d-flex justify-content-evenly mb-3">
          <div>
            <input
              type="radio"
              id="high"
              name="education"
              value="High School"
              onChange={handleChange}
              checked={data.education === "High School"}
            />
            <label htmlFor="high">High School</label>
          </div>
          <div>
            <input
              type="radio"
              id="college"
              name="education"
              value="College"
              onChange={handleChange}
              checked={data.education === "College"}
            />
            <label htmlFor="college">College</label>
          </div>
          <div>
            <input
              type="radio"
              id="university"
              name="education"
              value="Unversity"
              onChange={handleChange}
              checked={data.education === "Unversity"}
            />
            <label htmlFor="university">Unversity</label>
          </div>
        </div>

        <div className="d-flex justify-content-evenly mb-3">
          <select name="state" value={data.state} onChange={handleChange}>
            <optgroup label="states">
              <option value="UP">UP</option>
              <option value="MP">MP</option>
              <option value="Maharashtra" selected>
                Maharashtra
              </option>
            </optgroup>
          </select>
          <select name="division" value={data.division} onChange={handleChange}>
            <optgroup label="Divisions">
              <option value="Nagpur">Nagpur</option>
              <option value="Pune">Pune</option>
              <option value="Aurangabad">Aurangabad</option>
            </optgroup>
          </select>
          <select name="district" value={data.district} onChange={handleChange}>
            <optgroup label="Districts">
              <option value="Chandrapur">Chandrapur</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Bhandara">Bhandara</option>
            </optgroup>
          </select>
          <select name="taluka" value={data.taluka} onChange={handleChange}>
            <optgroup label="Taluka">
              <option value="Nagbhir">Nagbhir</option>
              <option value="chimur">chimur</option>
              <option value="Mul">Mul</option>
            </optgroup>
          </select>
          <select name="village" value={data.village} onChange={handleChange}>
            <optgroup label="Villages">
              <option value="Talodhi">Talodhi</option>
              <option value="Nagbhir">Nagbhir</option>
              <option value="Wadasa">Wadasa</option>
            </optgroup>
          </select>
        </div>
        <div className="d-flex justify-content-evenly mb-3">
          {toggleBtn ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
          <button
            className="btn btn-outline-primary"
            type="button"
            type="reset"
            onClick={handleRest}
          >
            Reset
          </button>
        </div>

        <table className="table table-dark text-center container">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>State</th>
              <th>Division</th>
              <th>District</th>
              <th>Taluka</th>
              <th>Village</th>
              <th>Education</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>

          {allData.map((currentVal, id) => (
            <tbody>
              <tr>
                <td>{currentVal.id}</td>
                <td>
                  {currentVal.input.first} {currentVal.input.last}
                </td>
                <td>{currentVal.input.state}</td>
                <td>{currentVal.input.division}</td>
                <td>{currentVal.input.district}</td>
                <td>{currentVal.input.taluka}</td>
                <td>{currentVal.input.village}</td>
                <td>{currentVal.input.education}</td>
                <td>{currentVal.input.gender}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(id) => handleDelete(currentVal.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(id) => handleEdit(currentVal.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </form>
    </div>
  );
}

export default Task;
