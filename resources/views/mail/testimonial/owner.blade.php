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
  <strong>E-Mail</strong><br>
  {{ $data->email }}
</div>
<div class="text-base pb-base">
  <strong>Partei</strong><br>
  {{ $data->party }}
</div>
<div class="text-base pb-base">
  <strong>Wohnort</strong><br>
  {{ $data->location }}
</div>
<div class="text-base pb-base">
  <strong>Zitat</strong><br>
  «{!! nl2br($data->quote) !!}»
</div>
</x-mail::message>
