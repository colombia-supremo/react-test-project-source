import React from 'react';
import medicalarticles from './medicalarticles.json';

class ViewMoreButton extends React.Component {

  handleChange = (e) => {
    this.props.onClick(e);
  }

  render() {
    return (
      <div className="display-section__view-more__wrapper">
        <button className="display-section__view-more" onClick={this.handleChange}>
          View more
        </button>
      </div>
    );
  }
}

class SectionItems extends React.Component {
  render() {
    return (
      <div className="display-section">
      {this.props.data.slice(0 , this.props.maxDisplay).map(item =>
          <div className="display-section__entry">
            <div className="display-section__entry__image"></div>
            <div className="display-section__entry__text">
              <h3 className="display-section__entry__section">{item.section}</h3>
              <span className="display-section__entry__speciality">
                Speciality: {item.speciality}, Audience: {item.audience}
              </span>
              <h2 className="display-section__entry__title">
                {item.title}
              </h2>
              <span className="display-section__entry__summary">
                {item.summary}
              </span>
            </div>
          </div>
      )}
      </div>
    );
  }
}

class SectionResults extends React.Component {

  constructor() {
    super();
    this.state = {
      searchQuery: "",
      filterspeciality: "",
      filterSection: "",
      filterAudience: "",
      maxDisplay: "3"
    };
  }

  handleExpand = (e) => {
    this.setState({filterspeciality: e.target.value});
  }

  handleDisplayQuantity = (e) => {
    if (this.state.maxDisplay==="3") {
      this.setState({maxDisplay: "100"});
    }
    else {
      this.setState({maxDisplay: "3"});
    }
  }

  render() {
  let sectionArray = this.props.data.filter(item => item.section.toLowerCase() === this.props.sectionHeader.toLowerCase());
  let sectionBlock;

  if (sectionArray.length !== 0) {
    sectionBlock= (
      <div>
        <h1 className="display-section__header">{this.props.sectionHeader}</h1>
        <SectionItems data={sectionArray} maxDisplay={this.state.maxDisplay} />
        <ViewMoreButton onClick={this.handleDisplayQuantity} />
      </div>
    );
  }
    return (
      <div>
        {sectionBlock}
      </div>
    );
  }
}

class SelectorInput extends React.Component {
  handleChange = (e) => {
    this.props.textChange(e);
  }

  render() {
    return (
      <div className="filter-input__container">
        <select className="filter-input" onChange={this.handleChange}>
        <option className="filter-option" key="0" value="">
          All {this.props.sectionName}
        </option>
        {this.props.filtertemplate.map ((item, key) =>
          <option className="filter-option" key={key} value={item}>
            {item}
          </option>)}
        </select>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      filterSpeciality: "",
      filterSection: "",
      filterAudience: "",
      data: medicalarticles
    };
  }

  changeSearchQuery = (e) => {
    this.setState({searchQuery: e.target.value});
  }
  changeFilterspeciality = (e) => {
    this.setState({filterspeciality: e.target.value});
  }
  changeFilterSection = (e) => {
    this.setState({filterSection: e.target.value});
  }
  changeFilterAudience = (e) => {
    this.setState({filterAudience: e.target.value});
  }
  handleExpand = (e) => {
    this.setState({filterSpeciality: " "});
  }

  render () {
    let data = this.state.data;
    let filter1 = this.state.data.map(function(item){ return item.speciality; });
    let filter1u = Array.from(new Set(filter1));
    let filter2 = this.state.data.map(function(item){ return item.section; });
    let filter2u = Array.from(new Set(filter2));
    let filter3 = this.state.data.map(function(item){ return item.audience; });
    let filter3u = Array.from(new Set(filter3));

    if(this.state.filterSection) {
      data = data.filter(item => item.section.toLowerCase() === this.state.filterSection.toLowerCase());
    }
    if(this.state.searchQuery) {
      data = data.filter(item => item.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())||item.summary.toLowerCase().includes(this.state.searchQuery.toLowerCase()));
    }
    if(this.state.filterSpeciality) {
      data = data.filter(item => item.speciality.toLowerCase() === this.state.filterSpeciality.toLowerCase());
    }
    if(this.state.filterAudience) {
      data = data.filter(item => item.audience.toLowerCase() === this.state.filterAudience.toLowerCase());
    }

    return (
      <div className="wrapper">
        <div className="controls__wrapper">
          <div className="search-input__wrapper">
            <p className="search-input__header">Search the Academy by keyword:</p>
            <div className="search-input__container">
              <input className="search-input" onChange={this.changeSearchQuery} value={this.state.searchQuery} />
            </div>
          </div>
          <div className="filter-input__wrapper">
            <p className="filter-input__header">Filter content by:</p>
            <SelectorInput textChange={this.changeFilterSpeciality} filtertemplate={filter1u} sectionName="specialties" />
            <SelectorInput textChange={this.changeFilterSection} filtertemplate={filter2u} sectionName="sections" />
            <SelectorInput textChange={this.changeFilterAudience} filtertemplate={filter3u} sectionName="audiences" />
          </div>
        </div>
        <div className="display-section__wrapper">
          {filter2u.map(item =>
            <div>
              <SectionResults data={data} sectionHeader={item}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
