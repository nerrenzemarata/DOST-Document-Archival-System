'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const filterTabs = [
  { id: 'proposal', label: 'Proposal', count: 5, color: '#1565c0' },
  { id: 'approved', label: 'Approved', count: 5, color: '#2e7d32' },
  { id: 'ongoing', label: 'Ongoing', count: 5, color: '#f57f17' },
  { id: 'withdrawal', label: 'Withdrawal', count: 5, color: '#c62828' },
  { id: 'terminated', label: 'Terminated', count: 5, color: '#ad1457' },
  { id: 'graduated', label: 'Graduated', count: 5, color: '#00695c' },
];

const projectData = [
  {
    id: 1,
    code: '001',
    title: 'Acquisition of Equipment for the Mass Production',
    firm: 'Best Friend Goodies',
    typeOfFirm: 'Agri-processing',
    address: 'Purok 4, Dansolihon, Cagayan de Oro City',
    corporatorName: 'Sergio Maria Lucia Sanico',
    contactNo: '09123456789',
    email: 'sample@gmail.com',
    status: 'Proposal',
    prioritySector: 'Food Processing',
    firmSize: 'Small',
    assignee: 'Jane Doe',
  },
  {
    id: 2,
    code: '002',
    title: 'Acquisition of Equipment for the Mass Production',
    firm: 'Best Friend Goodies',
    typeOfFirm: 'Agri-processing',
    address: 'Purok 4, Dansolihon, Cagayan de Oro City',
    corporatorName: 'Sergio Maria Lucia Sanico',
    contactNo: '09123456789',
    email: 'sample@gmail.com',
    status: 'Proposal',
    prioritySector: 'Food Processing',
    firmSize: 'Small',
    assignee: 'Jane Doe',
  },
  {
    id: 3,
    code: '003',
    title: 'Acquisition of Equipment for the Mass Production',
    firm: 'Best Friend Goodies',
    typeOfFirm: 'Agri-processing',
    address: 'Purok 4, Dansolihon, Cagayan de Oro City',
    corporatorName: 'Sergio Maria Lucia Sanico',
    contactNo: '09123456789',
    email: 'sample@gmail.com',
    status: 'Approved',
    prioritySector: 'Food Processing',
    firmSize: 'Small',
    assignee: 'Jane Doe',
  },
  {
    id: 4,
    code: '004',
    title: 'Acquisition of Equipment for the Mass Production',
    firm: 'Best Friend Goodies',
    typeOfFirm: 'Agri-processing',
    address: 'Purok 4, Dansolihon, Cagayan de Oro City',
    corporatorName: 'Sergio Maria Lucia Sanico',
    contactNo: '09123456789',
    email: 'sample@gmail.com',
    status: 'Ongoing',
    prioritySector: 'Food Processing',
    firmSize: 'Medium',
    assignee: 'Jane Doe',
  },
  {
    id: 5,
    code: '005',
    title: 'Acquisition of Equipment for the Mass Production',
    firm: 'Best Friend Goodies',
    typeOfFirm: 'Agri-processing',
    address: 'Purok 4, Dansolihon, Cagayan de Oro City',
    corporatorName: 'Sergio Maria Lucia Sanico',
    contactNo: '09123456789',
    email: 'sample@gmail.com',
    status: 'Withdrawn',
    prioritySector: 'Food Processing',
    firmSize: 'Small',
    assignee: 'Jane Doe',
  },
  {
    id: 6,
    code: '006',
    title: 'Acquisition of Equipment for the Mass Production',
    firm: 'Best Friend Goodies',
    typeOfFirm: 'Agri-processing',
    address: 'Purok 4, Dansolihon, Cagayan de Oro City',
    corporatorName: 'Sergio Maria Lucia Sanico',
    contactNo: '09123456789',
    email: 'sample@gmail.com',
    status: 'Terminated',
    prioritySector: 'Food Processing',
    firmSize: 'Small',
    assignee: 'Jane Doe',
  },
  {
    id: 7,
    code: '007',
    title: 'Acquisition of Equipment for the Mass Production',
    firm: 'Best Friend Goodies',
    typeOfFirm: 'Agri-processing',
    address: 'Purok 4, Dansolihon, Cagayan de Oro City',
    corporatorName: 'Sergio Maria Lucia Sanico',
    contactNo: '09123456789',
    email: 'sample@gmail.com',
    status: 'Evaluated',
    prioritySector: 'Food Processing',
    firmSize: 'Large',
    assignee: 'Jane Doe',
  },
  {
    id: 8,
    code: '008',
    title: 'Acquisition of Equipment for the Mass Production',
    firm: 'Best Friend Goodies',
    typeOfFirm: 'Agri-processing',
    address: 'Purok 4, Dansolihon, Cagayan de Oro City',
    corporatorName: 'Sergio Maria Lucia Sanico',
    contactNo: '09123456789',
    email: 'sample@gmail.com',
    status: 'Proposal',
    prioritySector: 'Food Processing',
    firmSize: 'Small',
    assignee: 'Jane Doe',
  },
];

export default function SetupPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('proposal');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'proposal': return 'status-proposal';
      case 'approved': return 'status-approved';
      case 'ongoing': return 'status-ongoing';
      case 'withdrawal': return 'status-withdrawal';
      case 'terminated': return 'status-terminated';
      case 'graduated': return 'status-graduated';
      default: return 'status-proposal';
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-circle">
            <Image src="/Logo1.png" alt="DOST Logo" width={48} height={48} />
          </div>
          <div className="header-text">
            <div className="header-subtitle">Provincial Science and Technology Office in Misamis Oriental</div>
            <div className="header-title">Department of Science and Technology</div>
          </div>
        </div>
        <div className="header-right">
          <button className="header-icon-btn"><Icon icon="mdi:link-variant" width={24} height={24} /></button>
          <button className="header-icon-btn"><Icon icon="mdi:bell-outline" width={24} height={24} /></button>
          <div className="user-info">
            <Icon icon="mdi:account-circle" width={36} height={36} color="#666" />
            <span className="user-name">Jane Doe</span>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <Icon icon={sidebarCollapsed ? "mdi:chevron-right" : "mdi:chevron-left"} width={20} height={20} color="#fff" />
          </button>
          <nav className="sidebar-nav">
            <Link href="/dashboard" className="nav-item">
              <Icon icon="mdi:view-grid" width={24} height={24} />
            </Link>
            <Link href="/dashboard" className="nav-item">
              <Icon icon="mdi:magnify" width={24} height={24} />
            </Link>
            <Link href="/setup" className="nav-item active">
              <Icon icon="mdi:office-building" width={24} height={24} />
            </Link>
            <Link href="/cest" className="nav-item">
              <Icon icon="mdi:leaf" width={24} height={24} />
            </Link>
            <button className="nav-item">
              <Icon icon="mdi:clock-outline" width={24} height={24} />
            </button>
          </nav>
        </aside>

        <main className="setup-main">
          {/* SETUP Header */}
          <div className="setup-header">
            <div className="setup-title-section">
              <div className="setup-logo-icon">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="25" cy="25" r="23" stroke="#146184" strokeWidth="3" fill="none"/>
                  <circle cx="25" cy="25" r="15" stroke="#00AEEF" strokeWidth="3" fill="none"/>
                  <circle cx="25" cy="25" r="7" fill="#F5A623"/>
                  <path d="M25 2 L25 10" stroke="#146184" strokeWidth="3"/>
                  <path d="M25 40 L25 48" stroke="#146184" strokeWidth="3"/>
                  <path d="M2 25 L10 25" stroke="#146184" strokeWidth="3"/>
                  <path d="M40 25 L48 25" stroke="#146184" strokeWidth="3"/>
                </svg>
              </div>
              <div className="setup-title-text">
                <h1 className="setup-title">SETUP 4.0</h1>
                <p className="setup-subtitle">Small Enterprise Technology<br/>Upgrading Program</p>
              </div>
            </div>
            <div className="setup-search-section">
              <div className="setup-search-container">
                <Icon icon="mdi:magnify" className="setup-search-icon" width={20} height={20} />
                <input
                  type="text"
                  className="setup-search-input"
                  placeholder="Search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button className="add-project-btn">
              <Icon icon="mdi:plus" width={20} height={20} />
              Add New Project
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                className={`filter-tab ${activeFilter === tab.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                <div className="filter-label-row">
                  <span className="filter-label">{tab.label}</span>
                  <span className="filter-dot" style={{ backgroundColor: tab.color }}></span>
                </div>
                <span className="filter-count">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Masterlist Section */}
          <div className="masterlist-section">
            <div className="masterlist-header">
              <h2 className="masterlist-title">MASTERLIST</h2>
              <div className="masterlist-actions">
                <button className="masterlist-btn">
                  <Icon icon="mdi:sort" width={16} height={16} />
                  Sort
                </button>
                <button className="masterlist-btn">
                  <Icon icon="mdi:filter-variant" width={16} height={16} />
                  Filter
                </button>
                <button className="masterlist-btn export">
                  <Icon icon="mdi:file-pdf-box" width={16} height={16} />
                  Export PDF
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="table-container">
              <table className="masterlist-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Project Title</th>
                    <th>Firm</th>
                    <th>Type of Firm</th>
                    <th>Address</th>
                    <th>Corporator&apos;s Name</th>
                    <th>Contact No.</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Priority Sector</th>
                    <th>Firm Size</th>
                    <th>Assignee</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.map((project) => (
                    <tr key={project.id}>
                      <td className="code-cell">{project.code}</td>
                      <td className="project-title-cell">{project.title}</td>
                      <td>{project.firm}</td>
                      <td><span className="firm-badge">{project.typeOfFirm}</span></td>
                      <td>{project.address}</td>
                      <td>{project.corporatorName}</td>
                      <td>{project.contactNo}</td>
                      <td>{project.email}</td>
                      <td><span className={`status-badge ${getStatusClass(project.status)}`}>{project.status}</span></td>
                      <td>{project.prioritySector}</td>
                      <td>{project.firmSize}</td>
                      <td>{project.assignee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
