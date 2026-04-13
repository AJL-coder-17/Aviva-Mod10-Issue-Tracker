import React from "react";

// Define Issue type
type Issue = {
  id: number;
  status: string;
  priority: string;
  owner: string;
  created: Date;
  effort: number;
  completionDate?: Date;
  title: string;
};

/** Parses YYYY-MM-DD as a local calendar date (avoids UTC midnight shift from `new Date("...")`). */
function parseLocalYmd(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const ISSUE_TABLE_SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

function formatIssueTableDate(date: Date): string {
  const month = ISSUE_TABLE_SHORT_MONTHS[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  return `${month} ${day}, ${date.getFullYear()}`;
}

// IssueRow Props
type IssueRowProps = {
  issue: Issue;
};

// IssueRow Component
class IssueRow extends React.Component<IssueRowProps> {
  render() {
    const { issue } = this.props;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.priority}</td>
        <td>{issue.owner}</td>
        <td>{formatIssueTableDate(issue.created)}</td>
        <td>{issue.effort}</td>
        <td>
          {issue.completionDate
            ? formatIssueTableDate(issue.completionDate)
            : ""}
        </td>
        <td>{issue.title}</td>
      </tr>
    );
  }
}

// IssueTable Props
type IssueTableProps = {
  issues: Issue[];
};

// IssueTable Component
class IssueTable extends React.Component<IssueTableProps> {
  render() {
    const issueRows = this.props.issues.map((issue) => (
      <IssueRow key={issue.id} issue={issue} />
    ));

    const borderedStyle: React.CSSProperties = {
      border: "1px solid silver",
      padding: 6,
    };

    return (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={borderedStyle}>Id</th>
            <th style={borderedStyle}>Status</th>
            <th style={borderedStyle}>Priority</th>
            <th style={borderedStyle}>Owner</th>
            <th style={borderedStyle}>Created</th>
            <th style={borderedStyle}>Effort</th>
            <th style={borderedStyle}>Completion Date</th>
            <th style={borderedStyle}>Title</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    );
  }
}

// IssueFilter Component (no props)
class IssueFilter extends React.Component {
  render() {
    return <div></div>;
  }
}

// IssueAdd Component (no props)
class IssueAdd extends React.Component {
  render() {
    return <div>This is a placeholder for an Issue Add entry form.</div>;
  }
}

// Sample Data
const issues: Issue[] = [
  {
    id: 1,
    status: "Open",
    priority: "High",
    owner: "Ravan",
    created: parseLocalYmd("2016-08-15"),
    effort: 5,
    title: "Error in console when clicking Add",
  },

  {
    id: 2,
    status: "Assigned",
    priority: "Low",
    owner: "Eddie",
    created: parseLocalYmd("2016-08-16"),
    effort: 14,
    completionDate: parseLocalYmd("2016-08-30"),
    title: "Missing bottom border on panel",
  },

  {
    id: 3,
    status: "New",
    priority: "Medium",
    owner: "Aviva",
    created: parseLocalYmd("2026-04-12"),
    effort: 17,
    title: "Incorrect number of boxes on interface",
  },
];

class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
      <h1>Issue Tracker</h1>
      <IssueFilter />
      <hr />
      <p>Total Issues: {issues.length}</p>
      <IssueTable issues={issues} />
      <hr />
      <IssueAdd />
      </React.Fragment>
    );
  }
}

export default IssueList;