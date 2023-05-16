<x-mail::message>
<div class="text-base font-bold pb-large">
  Neues Testimonial
</div>
<div class="text-base pb-base">
  <strong>Vorname</strong><br>
  {{ $data->firstname }}
</div>
<div class="text-base pb-base">
  <strong>Name</strong><br>
  {{ $data->name }}
</div>
<div class="text-base pb-base">
  <strong>Partei</strong><br>
  {{ $data->party }}
</div>
<div class="text-base pb-base">
  <strong>Wohnort</strong><br>
  {{ $data->location }}
</div>
</x-mail::message>
