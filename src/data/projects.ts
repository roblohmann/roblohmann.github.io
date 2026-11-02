const gh = (repo: string) => `https://github.com/roblohmann/${repo}`;

export interface Project {
  name: string;
  description: string;
  url: string;
  packages?: string[];
  technologies: string[];
  featured?: boolean;
  stars?: number;
  forks?: number;
}

export const projectSlug = (project: Project) => project.name.toLowerCase();

export interface ProjectGroup {
  title: string;
  description: string;
  projects: Project[];
}

export const projectGroups: ProjectGroup[] = [
  {
    title: 'Basis en hulpmiddelen',
    description: 'Fundamentele extensies en helpers voor .NET, als bouwstenen voor andere projecten.',
    projects: [
      {
        name: 'CodeCube.Core',
        description: 'Basisset met handige enumeraties, extensies en helpers voor het .NET Core framework.',
        url: gh('CodeCube.Core'),
        packages: ['CodeCube.Core'],
        technologies: ['C#', '.NET', 'NuGet'],
      },
      {
        name: 'CodeCube.Core.Extensions',
        description: 'Een set extensiemethoden voor het .NET Core framework.',
        url: gh('CodeCube.Core.Extensions'),
        packages: ['CodeCube.Core.Extensions'],
        technologies: ['C#', '.NET', 'NuGet'],
      },
      {
        name: 'CodeCube.Core.Extensions.Drawing',
        description: 'Extensiemethoden voor het bewerken van afbeeldingen, gebouwd op System.Drawing.Common (alleen Windows).',
        url: gh('CodeCube.Core.Extensions.Drawing'),
        packages: ['CodeCube.Core.Extensions.Drawing'],
        technologies: ['C#', '.NET', 'System.Drawing'],
      },
      {
        name: 'CodeCube.ExifLib',
        description: 'Lichtgewicht bibliotheek om Exif-gegevens uit afbeeldingen te lezen, een port van de originele ExifLib.',
        url: gh('CodeCube.ExifLib'),
        packages: ['CodeCube.ExifLib'],
        technologies: ['C#', '.NET', 'Exif'],
      },
      {
        name: 'CodeCube.TestFixtures.Xunit',
        description: 'Toont alles wat via Microsoft.Extensions.Logger wordt weggeschreven in de testresultaten van xUnit.',
        url: gh('CodeCube.TestFixtures.Xunit'),
        packages: ['CodeCube.TestFixtures.XUnit'],
        technologies: ['C#', 'xUnit', 'Logging'],
      },
    ],
  },
  {
    title: "ASP.NET Core en API's",
    description: "Bibliotheken voor webapplicaties en API's: van statuscodes tot healthchecks.",
    projects: [
      {
        name: 'CodeCube.AspNetCore.Extensions',
        description: 'Extensies voor ASP.NET Core, zoals een versie-header die automatisch uit de entry assembly wordt gehaald.',
        url: gh('CodeCube.AspNetCore.Extensions'),
        packages: ['CodeCube.AspNetCore.Extensions'],
        technologies: ['C#', 'ASP.NET Core', 'NuGet'],
      },
      {
        name: 'CodeCube.AspNetCore.HealthChecks.Extensions',
        description: 'Drie packages met extensies op AspNetCore.Diagnostics.HealthChecks: response writers en versie-informatie.',
        url: gh('CodeCube.AspNetCore.HealthChecks.Extensions'),
        packages: ['CodeCube.AspNetCore.HealthChecks.Extensions.Response', 'CodeCube.AspNetCore.HealthChecks.Extensions.Versioning', 'CodeCube.AspNetCore.HealthChecks.Extensions.Uris.Versioning'],
        technologies: ['C#', 'ASP.NET Core', 'HealthChecks'],
      },
      {
        name: 'CodeCube.Mvc',
        description: 'MVC-hulpmiddelen zoals menu-items, broodkruimels, meta tags en Google Analytics-tags.',
        url: gh('CodeCube.MVC'),
        packages: ['CodeCube.Mvc.AspNetCore'],
        technologies: ['C#', 'ASP.NET Core', 'MVC'],
      },
      {
        name: 'CodeCube.Api',
        description: "Kleine bibliotheek met hulpmethoden voor het ontwikkelen van en communiceren met API's.",
        url: gh('CodeCube.API'),
        packages: ['CodeCube.API'],
        technologies: ['C#', 'ASP.NET Core', 'REST'],
      },
      {
        name: 'CodeCube.StatusCodes',
        description: 'Maakt het mogelijk om object results te gebruiken voor de statuscodes InternalServerError en BadGateway.',
        url: gh('CodeCube.StatusCodes'),
        packages: ['CodeCube.StatusCodes'],
        technologies: ['C#', 'ASP.NET Core', 'HTTP'],
      },
      {
        name: 'CodeCube.HttpExtensions',
        description: 'Kleine bibliotheek die HttpClient uitbreidt met een DeleteWithBodyAsync-methode.',
        url: gh('CodeCube.HttpExtensions'),
        packages: ['CodeCube.HttpExtensions'],
        technologies: ['C#', '.NET', 'HttpClient'],
      },
      {
        name: 'CodeCube.FluentValidation',
        description: 'Handige set aanvullende validators voor het FluentValidation framework.',
        url: gh('CodeCube.FluentValidation'),
        packages: ['CodeCube.FluentValidation'],
        technologies: ['C#', 'FluentValidation', 'NuGet'],
      },
    ],
  },
  {
    title: 'Azure',
    description: 'Wrappers en helpers rond veelgebruikte Azure-diensten.',
    projects: [
      {
        name: 'CodeCube.Azure.Storage',
        description: 'Helperklassen en wrappers om te verbinden met Azure Blob- en Table Storage.',
        url: gh('CodeCube.Azure.Storage'),
        packages: ['CodeCube.Azure.Storage'],
        technologies: ['C#', 'Azure Storage', 'NuGet'],
      },
      {
        name: 'CodeCube.Azure.Storage.Queues.Extensions',
        description: 'Extensiemethoden voor het uitvoeren van bewerkingen op Azure QueueMessages.',
        url: gh('CodeCube.Azure.Storage.Queues.Extensions'),
        technologies: ['C#', 'Azure Storage', 'Queues'],
      },
      {
        name: 'CodeCube.Azure.KeyVault',
        description: 'Eenvoudige wrapper rond Azure Key Vault om secrets, certificaten en keys op te halen.',
        url: gh('CodeCube.Azure.KeyVault'),
        packages: ['CodeCube.Azure.KeyVault'],
        technologies: ['C#', 'Azure Key Vault', 'NuGet'],
      },
      {
        name: 'CodeCube.Azure.ServiceBus.Attachements',
        description: 'Verstuurt bijlagen via Service Bus met het claim-check-pattern.',
        url: gh('CodeCube.Azure.ServiceBus.Attachements'),
        technologies: ['C#', 'Azure Service Bus', 'Messaging'],
      },
      {
        name: 'CodeCube.ApplicationInsights.Extensions',
        description: 'Verzameling telemetry initializers om beter gebruik te maken van Application Insights.',
        url: gh('CodeCube.ApplicationInsights.Extensions'),
        packages: ['CodeCube.ApplicationInsights.Extensions'],
        technologies: ['C#', 'Application Insights', 'Telemetry'],
      },
    ],
  },
  {
    title: 'Data',
    description: 'Toegang tot data met Entity Framework Core.',
    projects: [
      {
        name: 'CodeCube.DataAccess',
        description: 'Repository pattern en helpers rond Entity Framework Core, voor SQL Server en PostgreSQL.',
        url: gh('CodeCube.DataAccess'),
        packages: ['CodeCube.DataAccess.EntityFrameworkCore', 'CodeCube.DataAccess.EntityFrameworkCore.Sql', 'CodeCube.DataAccess.EntityFrameworkCore.PostgreSQL'],
        technologies: ['C#', 'EF Core', 'PostgreSQL', 'SQL Server'],
      },
    ],
  },
];

// Projecten die op de homepage worden uitgelicht.
const featuredNames = [
  'CodeCube.Core',
  'CodeCube.Azure.Storage',
  'CodeCube.AspNetCore.Extensions',
  'CodeCube.AspNetCore.HealthChecks.Extensions',
  'CodeCube.DataAccess',
  'CodeCube.StatusCodes',
];

const allProjects = projectGroups.flatMap((group) => group.projects);

export const featuredProjects: Project[] = featuredNames.map((name) => {
  const project = allProjects.find((p) => p.name === name);
  if (!project) {
    throw new Error(`Uitgelicht project niet gevonden: ${name}`);
  }
  return project;
});

