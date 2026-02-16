'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import DashboardLayout from '../components/DashboardLayout';

interface CestProject {
  id: string;
  code: string;
  projectTitle: string;
  location: string | null;
  beneficiaries: string | null;
  programFunding: string | null;
  status: string | null;
  approvedAmount: number | null;
  releasedAmount: number | null;
  projectDuration: string | null;
  staffAssigned: string | null;
  year: string | null;
  dateOfApproval: string | null;
}

function formatCurrency(value: number | null): string {
  if (value == null) return '—';
  return `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Cascading address data
const addressData: Record<string, Record<string, string[]>> = {
  'Misamis Oriental': {
    'Cagayan de Oro City': [
      'Agusan', 'Balulang', 'Bayabas', 'Bayanga', 'Besigan', 'Bonbon', 'Bugo', 'Bulua',
      'Camaman-an', 'Canitoan', 'Carmen', 'Consolacion', 'Cugman', 'Dansolihon', 'F.S. Catanico',
      'Gusa', 'Iponan', 'Kauswagan', 'Lapasan', 'Macabalan', 'Macasandig', 'Mambuaya',
      'Nazareth', 'Pagalungan', 'Pagatpat', 'Patag', 'Puerto', 'Puntod', 'San Simon',
      'Tablon', 'Tagpangi', 'Taglimao', 'Tignapoloan', 'Tuburan', 'Tumpagon',
    ],
    'Opol': ['Awang', 'Bagocboc', 'Barra', 'Bonbon', 'Cauyonan', 'Igpit', 'Luyong Bonbon', 'Poblacion', 'Taboc'],
    'El Salvador': ['Amoros', 'Bolisong', 'Cogon', 'Hinigdaan', 'Kibonbon', 'Molugan', 'Poblacion', 'Sinaloc', 'Taytay'],
    'Alubijid': ['Baybay', 'Benigwayan', 'Calatcat', 'Lanao', 'Larapan', 'Libertad', 'Mandahican', 'Poblacion', 'Samay', 'Sungay'],
    'Laguindingan': ['Aromahon', 'Gasi', 'Kibaghot', 'Moog', 'Poblacion', 'Sinai', 'Tubajon'],
    'Gitagum': ['Burnay', 'Cogon', 'Manaka', 'Matangad', 'Pangayawan', 'Poblacion', 'Tala-o'],
    'Libertad': ['Ane-i', 'Caluya', 'Coracon', 'Gimangpang', 'Kimalok', 'Poblacion', 'San Juan', 'Solana'],
    'Initao': ['Aloe', 'Gimangpang', 'Jampason', 'Kamelon', 'Poblacion', 'San Pedro', 'Tawantawan', 'Tubigan'],
    'Naawan': ['Don Pedro', 'Linangkayan', 'Lubilan', 'Mapulog', 'Maputi', 'Poblacion', 'Tagbalogo'],
    'Manticao': ['Argayoso', 'Camanga', 'Kauswagan', 'Pagawan', 'Poblacion', 'Punta Silum', 'Tuod'],
    'Lugait': ['Aya-aya', 'Betahon', 'Biga', 'Lower Talacogon', 'Poblacion', 'Upper Talacogon'],
    'Tagoloan': ['Balubal', 'Casinglot', 'Gracia', 'Mohon', 'Nangcaon', 'Natumolan', 'Poblacion', 'Tagoloan Poblacion', 'Villanueva'],
    'Villanueva': ['Balacanas', 'Imelda', 'Katipunan', 'Looc', 'Poblacion', 'San Martin', 'Tambobong'],
    'Jasaan': ['Aplaya', 'Bobuntugan', 'Corrales', 'Danao', 'Jampason', 'Kimaya', 'Lower Jasaan', 'Poblacion', 'San Isidro', 'Upper Jasaan'],
    'Balingasag': ['Baliwagan', 'Cogon', 'Dasigon', 'Linugos', 'Mambayaan', 'Poblacion', 'San Juan', 'Talusan'],
    'Lagonglong': ['Banglay', 'Gaston', 'Kabulawan', 'Poblacion', 'Tabok', 'Umagos'],
    'Salay': ['Alipuaton', 'Bunal', 'Casulog', 'Dasigon', 'Looc', 'Matampa', 'Poblacion', 'Rizal'],
    'Binuangan': ['Dampias', 'Kitamban', 'Mabini', 'Poblacion', 'Silo-o', 'Sto. Rosario'],
    'Sugbongcogon': ['Alicomohan', 'Kaulayanan', 'Kinoguitan', 'Poblacion', 'San Jose'],
    'Kinoguitan': ['Baliangao', 'Caluya', 'Esperanza', 'Poblacion', 'Sanghan', 'Sugbongcogon'],
    'Claveria': ['Ane-i', 'Aposkahoy', 'Hinaplanan', 'Lanise', 'Luna', 'Minalwang', 'Poblacion', 'Rizal', 'San Vicente'],
    'Medina': ['Banglay', 'Cabug', 'Duka', 'Gingoog', 'Poblacion', 'San Roque'],
    'Talisayan': ['Camuayan', 'Casibole', 'Katipunan', 'Poblacion', 'San Isidro', 'Sindangan'],
    'Magsaysay': ['Candiis', 'Damayuhan', 'Kakuigan', 'Poblacion', 'San Isidro'],
    'Balingoan': ['Baukbauk', 'Dolores', 'Hambabauyon', 'Poblacion', 'Waterfalls'],
  },
  'Bukidnon': {
    'Malaybalay City': ['Aglayan', 'Bangcud', 'Busdi', 'Casisang', 'Dalwangan', 'Imbayao', 'Laguitas', 'Patpat', 'Poblacion', 'San Jose', 'Sumpong'],
    'Valencia City': ['Bagontaas', 'Batangan', 'Catumbalon', 'Colonia', 'Lumbayao', 'Mailag', 'Poblacion', 'San Carlos', 'Tongantongan'],
    'Manolo Fortich': ['Alae', 'Dahilayan', 'Dalirig', 'Kulaman', 'Linabo', 'Poblacion', 'Tankulan'],
    'Sumilao': ['Kisolon', 'Licoan', 'Poblacion', 'San Roque', 'Vista Villa'],
  },
  'Lanao del Norte': {
    'Iligan City': ['Buruun', 'Dalipuga', 'Del Carmen', 'Hinaplanon', 'Kiwalan', 'Mahayahay', 'Maria Cristina', 'Pala-o', 'Poblacion', 'Santiago', 'Suarez', 'Tambacan', 'Tibanga', 'Tubod', 'Villaverde'],
    'Kapatagan': ['Balonging', 'Daan Lanao', 'Mabatao', 'Maranding', 'Nangka', 'Poblacion', 'Taguitic'],
    'Tubod': ['Baroy', 'Lala', 'Maigo', 'Poblacion'],
  },
  'Camiguin': {
    'Mambajao': ['Agoho', 'Baylao', 'Benoni', 'Bug-ong', 'Kuguita', 'Poblacion', 'Tupsan', 'Yumbing'],
    'Catarman': ['Benoni', 'Bonbon', 'Hubangon', 'Mainit', 'Poblacion'],
    'Sagay': ['Alangilan', 'Bonbon', 'Maac', 'Poblacion'],
    'Guinsiliban': ['Butay', 'Cantaan', 'Liong', 'Poblacion'],
  },
};

const modalInputCls = "w-full py-2 px-3 border border-[#d0d0d0] rounded-lg text-[13px] font-[inherit] text-[#333] bg-white transition-all duration-200 placeholder:text-[#aaa] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(20,97,132,0.1)]";
const modalSelectCls = `${modalInputCls} modal-select`;
const errCls = "border-[#dc3545]! focus:border-[#dc3545]! focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)]!";

export default function CestPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<CestProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDate: '',
    province: '',
    municipality: '',
    barangay: '',
    beneficiaries: '',
    typeOfBeneficiary: '',
    partnerLGU: '',
    cooperatorName: '',
    contactNumber: '',
    emailAddress: '',
    programFunding: '',
    status: '',
    approvedAmount: '',
    releasedAmount: '',
    projectDuration: '',
    dateOfRelease: '',
    companyLogo: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      projectTitle: '', projectDate: '', province: '', municipality: '', barangay: '',
      beneficiaries: '', typeOfBeneficiary: '', partnerLGU: '', cooperatorName: '',
      contactNumber: '', emailAddress: '', programFunding: '', status: '',
      approvedAmount: '', releasedAmount: '', projectDuration: '', dateOfRelease: '',
      companyLogo: null,
    });
    setFormErrors({});
    setSaveError('');
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cest-projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch CEST projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const filteredProjects = projects.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.code.toLowerCase().includes(q) ||
      p.projectTitle.toLowerCase().includes(q) ||
      (p.location?.toLowerCase().includes(q) ?? false) ||
      (p.staffAssigned?.toLowerCase().includes(q) ?? false);
  });

  const totalApproved = projects.reduce((sum, p) => sum + (p.approvedAmount ?? 0), 0);
  const totalReleased = projects.reduce((sum, p) => sum + (p.releasedAmount ?? 0), 0);
  const cestCount = projects.filter(p => p.programFunding === 'CEST').length;
  const liraCount = projects.filter(p => p.programFunding === 'LIRA').length;
  const swepCount = projects.filter(p => p.programFunding === 'SWEP').length;
  const otherCount = projects.filter(p => p.programFunding && !['CEST', 'LIRA', 'SWEP'].includes(p.programFunding)).length;

  const filterCards = [
    { id: 'approved-amount', label: 'Total Approved Amount', value: formatCurrency(totalApproved), isAmount: true },
    { id: 'released-amount', label: 'Total Released Amount', value: formatCurrency(totalReleased), isAmount: true },
    { id: 'cest-program', label: 'Total CEST Program', value: String(cestCount), isAmount: false },
    { id: 'lira-program', label: 'Total LIRA Program', value: String(liraCount), isAmount: false },
    { id: 'swep-program', label: 'Total SWEP Program', value: String(swepCount), isAmount: false },
    { id: 'other-funding', label: 'Total Other Funding Source', value: String(otherCount), isAmount: false },
  ];

  const municipalities = formData.province && addressData[formData.province] ? Object.keys(addressData[formData.province]) : [];
  const barangays = formData.province && formData.municipality && addressData[formData.province]?.[formData.municipality] ? addressData[formData.province][formData.municipality] : [];

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'province') { updated.municipality = ''; updated.barangay = ''; }
      if (field === 'municipality') { updated.barangay = ''; }
      return updated;
    });
    if (formErrors[field]) {
      setFormErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, companyLogo: e.target.files![0] }));
    }
  };

  const handleSaveProject = async () => {
    const errors: Record<string, string> = {};

    if (!formData.projectTitle.trim()) errors.projectTitle = 'Project title is required';
    if (!formData.programFunding) errors.programFunding = 'Program/Funding is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSaveError('');
    setSaving(true);

    try {
      // Generate code: CEST-XXXX based on count
      const codeNum = String(projects.length + 1).padStart(4, '0');
      const code = `CEST-${codeNum}`;

      // Build location from address fields
      const locationParts = [formData.barangay, formData.municipality, formData.province].filter(Boolean);
      const location = locationParts.length > 0 ? locationParts.join(', ') : null;

      const payload: Record<string, unknown> = {
        code,
        projectTitle: formData.projectTitle,
        location,
        beneficiaries: formData.beneficiaries || null,
        programFunding: formData.programFunding || null,
        status: formData.status || null,
        approvedAmount: formData.approvedAmount ? parseFloat(formData.approvedAmount) : null,
        releasedAmount: formData.releasedAmount ? parseFloat(formData.releasedAmount) : null,
        projectDuration: formData.projectDuration || null,
        staffAssigned: formData.cooperatorName || null,
        year: formData.projectDate ? new Date(formData.projectDate).getFullYear().toString() : null,
        dateOfApproval: formData.dateOfRelease || null,
      };

      const res = await fetch('/api/cest-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Failed to save project');
      }

      setShowAddModal(false);
      resetForm();
      await fetchProjects();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout activePath="/cest">
      <main className="flex-1 py-5 px-[30px] bg-[#f5f5f5] overflow-x-auto">
        {/* CEST Header */}
        <div className="flex justify-between items-center bg-white py-[15px] px-[25px] rounded-[15px] mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] gap-[30px]">
          <div className="flex items-center gap-[15px]">
            <div className="w-[50px] h-[50px] flex items-center justify-center">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="23" stroke="#2e7d32" strokeWidth="2" fill="none"/>
                <path d="M25 10 L25 25 L35 35" stroke="#4caf50" strokeWidth="3" fill="none"/>
                <circle cx="25" cy="25" r="5" fill="#8bc34a"/>
                <path d="M15 20 Q25 5 35 20" stroke="#2e7d32" strokeWidth="2" fill="none"/>
                <path d="M20 35 Q25 45 30 35" stroke="#4caf50" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-[28px] font-bold text-[#2e7d32] m-0 leading-none">CEST</h1>
              <p className="text-[10px] text-[#666] m-0 leading-[1.3]">Community Empowerment thru<br/>Science and Technology</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-[600px] h-[50px]">
              <Icon icon="mdi:magnify" className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#999]" width={20} height={20} />
              <input
                type="text"
                className="w-full h-full py-0 pr-[25px] pl-[50px] border border-[#e0e0e0] rounded-[25px] text-[15px] bg-[#f5f5f5] transition-all duration-200 focus:outline-none focus:border-primary focus:bg-white focus:shadow-[0_2px_8px_rgba(20,97,132,0.1)] placeholder:text-[#999]"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <button
            className="flex items-center gap-2 py-3 px-5 bg-accent text-white border-none rounded-[10px] text-sm font-semibold cursor-pointer transition-colors duration-200 whitespace-nowrap hover:bg-accent-hover"
            onClick={() => { resetForm(); setShowAddModal(true); }}
          >
            <Icon icon="mdi:plus" width={20} height={20} />
            Add New Project
          </button>
        </div>

        {/* Filter Cards */}
        <div className="flex gap-[15px] mb-5 w-full">
          {filterCards.map(card => (
            <div key={card.id} className="flex-1 flex flex-col items-center justify-center py-5 px-[15px] bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <span className="text-[11px] text-[#666] mb-2 font-medium text-center">{card.label}</span>
              <span className={`font-bold ${card.isAmount ? 'text-xl text-[#2e7d32]' : 'text-[28px] text-primary'}`}>{card.value}</span>
            </div>
          ))}
        </div>

        {/* Approved Section */}
        <div className="bg-white rounded-[15px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-5 pb-[15px] border-b border-[#e0e0e0]">
            <h2 className="text-lg font-bold text-primary m-0 flex items-center gap-2.5">
              <Icon icon="mdi:check-circle" width={24} height={24} color="#2e7d32" />
              APPROVED
            </h2>
            <div className="flex gap-2.5">
              <button className="flex items-center gap-[5px] py-2 px-[15px] bg-white border border-[#d0d0d0] rounded-lg text-[13px] text-[#333] cursor-pointer transition-all duration-200 hover:bg-[#f5f5f5] hover:border-primary">
                <Icon icon="mdi:sort" width={16} height={16} />
                Sort
              </button>
              <button className="flex items-center gap-[5px] py-2 px-[15px] bg-white border border-[#d0d0d0] rounded-lg text-[13px] text-[#333] cursor-pointer transition-all duration-200 hover:bg-[#f5f5f5] hover:border-primary">
                <Icon icon="mdi:filter-variant" width={16} height={16} />
                Filter
              </button>
              <button className="flex items-center gap-[5px] py-2 px-[15px] bg-[#dc3545] text-white border border-[#dc3545] rounded-lg text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#c82333]">
                <Icon icon="mdi:file-pdf-box" width={16} height={16} />
                Export PDF
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs [&_th]:py-3 [&_th]:px-2.5 [&_th]:text-left [&_th]:border-b [&_th]:border-[#e0e0e0] [&_th]:bg-[#f9f9f9] [&_th]:font-semibold [&_th]:text-[#333] [&_th]:whitespace-normal [&_th]:min-w-[80px] [&_th]:align-middle [&_th]:text-center [&_td]:py-3 [&_td]:px-2.5 [&_td]:text-left [&_td]:border-b [&_td]:border-[#e0e0e0] [&_tbody_tr:hover]:bg-[#f9f9f9]">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Logo</th>
                  <th>Project Title</th>
                  <th>Location</th>
                  <th>Beneficiaries</th>
                  <th>Program/<br/>Funding</th>
                  <th>Status</th>
                  <th>Approved<br/>Amount</th>
                  <th>Released Amount</th>
                  <th>Project Duration</th>
                  <th>Staff<br/>Assigned</th>
                  <th>Year</th>
                  <th>Date of Approval (Ref.<br/>Approval Letter)</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={13} className="text-center py-8 text-[#999]">Loading projects...</td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center py-8 text-[#999]">No projects found</td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id}>
                      <td className="text-primary font-semibold whitespace-nowrap">{project.code}</td>
                      <td className="text-center">
                        <div className="w-8 h-8 rounded-full bg-[#e3f2fd] flex items-center justify-center inline-flex">
                          <Icon icon="mdi:store" width={18} height={18} color="#146184" />
                        </div>
                      </td>
                      <td className="max-w-[250px] text-[#333] font-medium whitespace-normal break-words">{project.projectTitle}</td>
                      <td>{project.location ?? '—'}</td>
                      <td>{project.beneficiaries ?? '—'}</td>
                      <td><span className="inline-block py-1 px-2.5 bg-[#e3f2fd] text-[#1565c0] rounded-[15px] text-[11px] font-medium">{project.programFunding ?? '—'}</span></td>
                      <td><span className="inline-block py-1 px-3 rounded-[15px] text-[11px] font-medium bg-[#e8f5e9] text-[#2e7d32]">{project.status ?? '—'}</span></td>
                      <td>{formatCurrency(project.approvedAmount)}</td>
                      <td>{formatCurrency(project.releasedAmount)}</td>
                      <td>{project.projectDuration ?? '—'}</td>
                      <td>{project.staffAssigned ?? '—'}</td>
                      <td>{project.year ?? '—'}</td>
                      <td>{project.dateOfApproval ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add New Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1100]" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-[20px] py-[25px] px-[35px] w-full max-w-[680px] max-h-[85vh] overflow-y-auto relative shadow-[0_10px_40px_rgba(0,0,0,0.3)]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-[15px] right-[15px] bg-transparent border-none cursor-pointer text-[#999] p-[5px] flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[#f0f0f0] hover:text-[#333]" onClick={() => setShowAddModal(false)}>
              <Icon icon="mdi:close" width={20} height={20} />
            </button>
            <h2 className="text-xl font-bold text-primary m-0 mb-[3px]">Add New Project</h2>
            <p className="text-xs text-[#888] m-0 mb-[15px]">Complete the form to register a new CEST project</p>

            <div className="flex flex-col gap-3">
              {/* Row 1: Project Title + Project Date */}
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Project Title<span className="text-[#dc3545] ml-0.5">*</span></label>
                  <input type="text" placeholder="Enter project title" value={formData.projectTitle} onChange={(e) => handleFormChange('projectTitle', e.target.value)} className={`${modalInputCls} ${formErrors.projectTitle ? errCls : ''}`} />
                  {formErrors.projectTitle && <span className="text-[#dc3545] text-[11px]">{formErrors.projectTitle}</span>}
                </div>
                <div className="flex flex-col gap-1 w-[160px]">
                  <label className="text-[13px] font-semibold text-[#333]">Project Date</label>
                  <input type="date" value={formData.projectDate} onChange={(e) => handleFormChange('projectDate', e.target.value)} className={modalInputCls} />
                </div>
              </div>

              {/* Row 2: Address */}
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-semibold text-[#333]">Address</label>
                <div className="grid grid-cols-3 gap-3">
                  <select value={formData.province} onChange={(e) => handleFormChange('province', e.target.value)} className={modalSelectCls}>
                    <option value="">Select Province</option>
                    {Object.keys(addressData).map(prov => (<option key={prov} value={prov}>{prov}</option>))}
                  </select>
                  <select value={formData.municipality} onChange={(e) => handleFormChange('municipality', e.target.value)} disabled={!formData.province} className={modalSelectCls}>
                    <option value="">Select City/Municipality</option>
                    {municipalities.map(mun => (<option key={mun} value={mun}>{mun}</option>))}
                  </select>
                  <select value={formData.barangay} onChange={(e) => handleFormChange('barangay', e.target.value)} disabled={!formData.municipality} className={modalSelectCls}>
                    <option value="">Barangay / Village / Purok</option>
                    {barangays.map(brgy => (<option key={brgy} value={brgy}>{brgy}</option>))}
                  </select>
                </div>
              </div>

              {/* Row 3: Beneficiaries, Type of Beneficiary, Partner LGU */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Beneficiaries</label>
                  <input type="text" placeholder="Enter beneficiaries" value={formData.beneficiaries} onChange={(e) => handleFormChange('beneficiaries', e.target.value)} className={modalInputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Type of Beneficiary</label>
                  <select value={formData.typeOfBeneficiary} onChange={(e) => handleFormChange('typeOfBeneficiary', e.target.value)} className={modalSelectCls}>
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Organization">Organization</option>
                    <option value="Community">Community</option>
                    <option value="LGU">LGU</option>
                    <option value="Cooperative">Cooperative</option>
                    <option value="Association">Association</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Partner LGU</label>
                  <input type="text" placeholder="Enter partner LGU" value={formData.partnerLGU} onChange={(e) => handleFormChange('partnerLGU', e.target.value)} className={modalInputCls} />
                </div>
              </div>

              {/* Row 4: Cooperator's Name, Contact Number, Email Address */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Cooperator&apos;s Name</label>
                  <input type="text" placeholder="Enter cooperator's name" value={formData.cooperatorName} onChange={(e) => handleFormChange('cooperatorName', e.target.value)} className={modalInputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Contact Number</label>
                  <input type="text" placeholder="e.g. 09123456789" value={formData.contactNumber} onChange={(e) => handleFormChange('contactNumber', e.target.value.replace(/\D/g, '').slice(0, 11))} className={modalInputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Email Address</label>
                  <input type="email" placeholder="Enter email address" value={formData.emailAddress} onChange={(e) => handleFormChange('emailAddress', e.target.value)} className={modalInputCls} />
                </div>
              </div>

              {/* Row 5: Program/Funding, Status, Approved Amount */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Program/Funding<span className="text-[#dc3545] ml-0.5">*</span></label>
                  <select value={formData.programFunding} onChange={(e) => handleFormChange('programFunding', e.target.value)} className={`${modalSelectCls} ${formErrors.programFunding ? errCls : ''}`}>
                    <option value="">Select Program</option>
                    <option value="CEST">CEST</option>
                    <option value="LIRA">LIRA</option>
                    <option value="SWEP">SWEP</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.programFunding && <span className="text-[#dc3545] text-[11px]">{formErrors.programFunding}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Status</label>
                  <select value={formData.status} onChange={(e) => handleFormChange('status', e.target.value)} className={modalSelectCls}>
                    <option value="">Select Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Approved Amount</label>
                  <input type="text" placeholder="e.g. 200000" value={formData.approvedAmount} onChange={(e) => handleFormChange('approvedAmount', e.target.value.replace(/[^\d.]/g, ''))} className={modalInputCls} />
                </div>
              </div>

              {/* Row 6: Released Amount, Project Duration, Date of Release */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Released Amount</label>
                  <input type="text" placeholder="e.g. 150000" value={formData.releasedAmount} onChange={(e) => handleFormChange('releasedAmount', e.target.value.replace(/[^\d.]/g, ''))} className={modalInputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Project Duration</label>
                  <input type="text" placeholder="e.g. 12 months" value={formData.projectDuration} onChange={(e) => handleFormChange('projectDuration', e.target.value)} className={modalInputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-semibold text-[#333]">Date of Release</label>
                  <input type="date" value={formData.dateOfRelease} onChange={(e) => handleFormChange('dateOfRelease', e.target.value)} className={modalInputCls} />
                </div>
              </div>

              {/* Row 7: Company Logo */}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-[13px] font-semibold text-[#333]">Company Logo</label>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleLogoChange} id="cest-logo-upload" className="absolute opacity-0 w-0 h-0" />
                  <label htmlFor="cest-logo-upload" className="flex flex-col items-center justify-center gap-1 p-4 border-2 border-dashed border-[#d0d0d0] rounded-[10px] cursor-pointer text-[#999] text-[13px] transition-all duration-200 hover:border-primary hover:text-primary hover:bg-[#f0f8ff]">
                    <Icon icon="mdi:cloud-upload-outline" width={28} height={28} />
                    <span>{formData.companyLogo ? formData.companyLogo.name : 'Drag & Drop your file here'}</span>
                    <span className="text-accent text-[12px] font-semibold mt-1">Select Files</span>
                  </label>
                </div>
              </div>

              {/* Save Button */}
              {saveError && <p className="text-[#dc3545] text-[13px] text-center m-0">{saveError}</p>}
              <div className="flex justify-center mt-0.5">
                <button className="py-2.5 px-[50px] bg-accent text-white border-none rounded-[10px] text-[15px] font-semibold cursor-pointer transition-colors duration-200 font-[inherit] hover:bg-accent-hover active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed" onClick={handleSaveProject} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
