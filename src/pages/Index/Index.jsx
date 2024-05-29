import React from "react";
import "./Index.css";
import Home from "../../components/Home/Home";
import IndexLeft from "../../components/IndexLeft/IndexLeft";
import IndexRight from "../../components/IndexRight/IndexRight";
import Saved from "../../components/Saved/Saved";
import Favorites from "../../components/Favorites/Favorites";
import Friends from "../../components/Friends/Friends";
import Request from "../../components/Request/Request";

export default function Index({subsection,setSubsection}) {
  // const [showRight, setShowRight] = useState(true);

  return (
    <div className="Index">
      <div className="index-left">
        <IndexLeft subsection={subsection} setSubsection={setSubsection} />
      </div>

      <div className="index-mid">
        {subsection === "Home" && <Home />}

        {subsection === "Friends" && <Friends />}

        {subsection === "Jobs" && <div>Jobs Section</div>}

        {subsection === "Saved" && <Saved />}

        {subsection === "Requests" && <Request />}

        {subsection === "Favorites" && <Favorites />}

        {subsection === "Pages" && <div>Pages Section</div>}

        {subsection === "Groups" && <div>Groups Section</div>}
      </div>

      <div className="index-right">
        <IndexRight setSubsection={setSubsection} />
      </div>
    </div>
  );
}
